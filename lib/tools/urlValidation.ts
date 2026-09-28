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
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return false;
  }

  const [a, b, c] = parts;

  if (a === 0) return true;
  if (a === 127) return true;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 169 && b === 254) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 192 && b === 0 && c === 2) return true;
  if (a === 198 && b === 51 && c === 100) return true;
  if (a === 203 && b === 0 && c === 113) return true;
  if (a >= 224 && a <= 239) return true;
  if (a >= 240) return true;

  return false;
}

export function isPrivateOrReservedIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase();

  if (normalized === "::1" || normalized === "::" || normalized === "0:0:0:0:0:0:0:1" || normalized === "0:0:0:0:0:0:0:0") {
    return true;
  }

  if (normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb")) {
    return true;
  }

  if (normalized.startsWith("fc") || normalized.startsWith("fd")) {
    return true;
  }

  if (normalized.startsWith("::ffff:")) {
    const ipv4Part = normalized.substring(7);
    if (isIP(ipv4Part) === 4) {
      return isPrivateOrReservedIPv4(ipv4Part);
    }
    return true;
  }

  return false;
}

export async function validateTargetUrl(rawUrl: string): Promise<UrlValidationResult> {
  if (!rawUrl || typeof rawUrl !== "string") {
    return {
      isValid: false,
      errorCategory: "INVALID_URL",
      errorMessage: "URL parameter is required.",
    };
  }

  let formattedUrl = rawUrl.trim();

  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(formattedUrl);
  } catch {
    return {
      isValid: false,
      errorCategory: "INVALID_URL",
      errorMessage: "The provided string is not a valid URL structure.",
    };
  }

  const protocol = parsedUrl.protocol.toLowerCase();
  if (protocol !== "http:" && protocol !== "https:") {
    return {
      isValid: false,
      errorCategory: "UNSUPPORTED_PROTOCOL",
      errorMessage: `Protocol '${parsedUrl.protocol}' is unsupported. Only HTTP and HTTPS are permitted.`,
    };
  }

  if (parsedUrl.username || parsedUrl.password) {
    return {
      isValid: false,
      errorCategory: "EMBEDDED_CREDENTIALS",
      errorMessage: "URLs with embedded credentials (user:pass@domain) are prohibited.",
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();

  if (
    hostname === "localhost" ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".lan") ||
    hostname.endsWith(".home") ||
    hostname.endsWith(".arpa")
  ) {
    return {
      isValid: false,
      errorCategory: "LOCALHOST_REJECTED",
      errorMessage: "Local, internal, or loopback hostnames are prohibited.",
    };
  }

  const ipVersion = isIP(hostname);
  if (ipVersion === 4) {
    if (isPrivateOrReservedIPv4(hostname)) {
      return {
        isValid: false,
        errorCategory: hostname === "169.254.169.254" ? "CLOUD_METADATA_REJECTED" : "PRIVATE_IP_REJECTED",
        errorMessage: "Targeting private or loopback IP addresses is prohibited.",
      };
    }
  } else if (ipVersion === 6) {
    if (isPrivateOrReservedIPv6(hostname)) {
      return {
        isValid: false,
        errorCategory: "PRIVATE_IP_REJECTED",
        errorMessage: "Targeting private or loopback IPv6 addresses is prohibited.",
      };
    }
  }

  try {
    const lookupResult = await lookup(hostname, { all: true });
    if (!lookupResult || lookupResult.length === 0) {
      return {
        isValid: false,
        errorCategory: "DNS_RESOLUTION_FAILED",
        errorMessage: `Could not resolve hostname '${hostname}'.`,
      };
    }

    for (const record of lookupResult) {
      if (record.family === 4 && isPrivateOrReservedIPv4(record.address)) {
        return {
          isValid: false,
          errorCategory: record.address === "169.254.169.254" ? "CLOUD_METADATA_REJECTED" : "PRIVATE_IP_REJECTED",
          errorMessage: `Hostname resolves to prohibited IP range (${record.address}).`,
          resolvedIp: record.address,
        };
      }
      if (record.family === 6 && isPrivateOrReservedIPv6(record.address)) {
        return {
          isValid: false,
          errorCategory: "PRIVATE_IP_REJECTED",
          errorMessage: `Hostname resolves to prohibited IPv6 range (${record.address}).`,
          resolvedIp: record.address,
        };
      }
    }

    const primaryIp = lookupResult[0].address;

    return {
      isValid: true,
      normalizedUrl: parsedUrl.toString(),
      resolvedIp: primaryIp,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      isValid: false,
      errorCategory: "DNS_RESOLUTION_FAILED",
      errorMessage: `DNS resolution failed for '${hostname}': ${errorMsg}`,
    };
  }
}
