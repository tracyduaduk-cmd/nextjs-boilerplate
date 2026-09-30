import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export type UrlValidationErrorCode =
  | "INVALID_URL"
  | "UNSUPPORTED_PROTOCOL"
  | "EMBEDDED_CREDENTIALS"
  | "LOCALHOST_REJECTED"
  | "PRIVATE_IP_REJECTED"
  | "CLOUD_METADATA_REJECTED"
  | "DNS_RESOLUTION_FAILED";

export interface UrlValidationResult {
  isValid: boolean;
  normalizedUrl?: string;
  errorCategory?: UrlValidationErrorCode;
  errorMessage?: string;
  resolvedIp?: string;
}

export function isPrivateOrReservedIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => isNaN(part) || part < 0 || part > 255)) return false;
  const [a, b, c] = parts;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 169 && b === 254) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 192 && b === 0 && c === 2) return true;
  if (a === 198 && b === 51 && c === 100) return true;
  if (a === 203 && b === 0 && c === 113) return true;
  if (a >= 224) return true;
  return false;
}

export function isPrivateOrReservedIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    normalized === "::1" ||
    normalized === "::" ||
    normalized === "0:0:0:0:0:0:0:1" ||
    normalized === "0:0:0:0:0:0:0:0"
  ) return true;
  if (
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb") ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("2001:db8") ||
    normalized.startsWith("ff") ||
    normalized.startsWith("::ffff:")
  ) return true;
  return false;
}

export async function validateTargetUrl(rawUrl: string): Promise<UrlValidationResult> {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { isValid: false, errorCategory: "INVALID_URL", errorMessage: "URL parameter is required." };
  }

  let formattedUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) formattedUrl = `https://${formattedUrl}`;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(formattedUrl);
  } catch {
    return { isValid: false, errorCategory: "INVALID_URL", errorMessage: "The provided string is not a valid URL structure." };
  }

  const protocol = parsedUrl.protocol.toLowerCase();
  if (protocol !== "http:" && protocol !== "https:") {
    return { isValid: false, errorCategory: "UNSUPPORTED_PROTOCOL", errorMessage: "Only HTTP and HTTPS URLs are permitted." };
  }
  if (parsedUrl.username || parsedUrl.password) {
    return { isValid: false, errorCategory: "EMBEDDED_CREDENTIALS", errorMessage: "URLs with embedded credentials are prohibited." };
  }

  const hostname = parsedUrl.hostname.toLowerCase().replace(/\.$/, "");
  if (
    hostname === "localhost" ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".lan") ||
    hostname.endsWith(".home") ||
    hostname.endsWith(".arpa")
  ) {
    return { isValid: false, errorCategory: "LOCALHOST_REJECTED", errorMessage: "Local, internal, or loopback hostnames are prohibited." };
  }

  const literalHostname = hostname.replace(/^\[|\]$/g, "");
  const ipVersion = isIP(literalHostname);
  if (ipVersion === 4 && isPrivateOrReservedIPv4(literalHostname)) {
    return {
      isValid: false,
      errorCategory: literalHostname === "169.254.169.254" ? "CLOUD_METADATA_REJECTED" : "PRIVATE_IP_REJECTED",
      errorMessage: "Targeting private or loopback IP addresses is prohibited.",
    };
  }
  if (ipVersion === 6 && isPrivateOrReservedIPv6(literalHostname)) {
    return { isValid: false, errorCategory: "PRIVATE_IP_REJECTED", errorMessage: "Targeting private or loopback IPv6 addresses is prohibited." };
  }

  try {
    const lookupResult = await lookup(literalHostname, { all: true });
    if (!lookupResult || lookupResult.length === 0) {
      return { isValid: false, errorCategory: "DNS_RESOLUTION_FAILED", errorMessage: "The target hostname could not be resolved." };
    }
    for (const record of lookupResult) {
      if (record.family === 4 && isPrivateOrReservedIPv4(record.address)) {
        return {
          isValid: false,
          errorCategory: record.address === "169.254.169.254" ? "CLOUD_METADATA_REJECTED" : "PRIVATE_IP_REJECTED",
          errorMessage: "The target hostname resolves to a prohibited IP range.",
          resolvedIp: record.address,
        };
      }
      if (record.family === 6 && isPrivateOrReservedIPv6(record.address)) {
        return { isValid: false, errorCategory: "PRIVATE_IP_REJECTED", errorMessage: "The target hostname resolves to a prohibited IPv6 range.", resolvedIp: record.address };
      }
    }
    return { isValid: true, normalizedUrl: parsedUrl.toString(), resolvedIp: lookupResult[0].address };
  } catch {
    return { isValid: false, errorCategory: "DNS_RESOLUTION_FAILED", errorMessage: "DNS resolution failed for the target hostname." };
  }
}
