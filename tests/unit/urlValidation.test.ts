import {
  isPrivateOrReservedIPv4,
  isPrivateOrReservedIPv6,
  validateTargetUrl,
} from "../../lib/tools/urlValidation";

async function runTests() {
  console.log("Running urlValidation unit tests...");

  console.assert(isPrivateOrReservedIPv4("127.0.0.1") === true, "127.0.0.1 loopback");
  console.assert(isPrivateOrReservedIPv4("10.0.0.5") === true, "10.0.0.0/8 private");
  console.assert(isPrivateOrReservedIPv4("172.16.0.1") === true, "172.16.0.0/12 private");
  console.assert(isPrivateOrReservedIPv4("192.168.1.1") === true, "192.168.0.0/16 private");
  console.assert(isPrivateOrReservedIPv4("169.254.169.254") === true, "169.254 Cloud Metadata");
  console.assert(isPrivateOrReservedIPv4("8.8.8.8") === false, "8.8.8.8 public DNS");
  console.assert(isPrivateOrReservedIPv4("1.1.1.1") === false, "1.1.1.1 public DNS");

  console.assert(isPrivateOrReservedIPv6("::1") === true, "::1 loopback");
  console.assert(isPrivateOrReservedIPv6("[::1]") === true, "bracketed IPv6 loopback");
  console.assert(isPrivateOrReservedIPv6("::ffff:7f00:1") === true, "mapped IPv4 loopback");
  console.assert(isPrivateOrReservedIPv6("fe80::1") === true, "fe80 link local");
  console.assert(isPrivateOrReservedIPv6("fc00::1") === true, "fc00 unique local");
  console.assert(isPrivateOrReservedIPv6("2001:4860:4860::8888") === false, "Google IPv6 public");

  const resLocal = await validateTargetUrl("http://localhost:3000");
  console.assert(resLocal.isValid === false, "localhost blocked");
  console.assert(resLocal.errorCategory === "LOCALHOST_REJECTED", "localhost category");

  const resLocalDot = await validateTargetUrl("http://localhost.:3000");
  console.assert(resLocalDot.isValid === false, "trailing-dot localhost blocked");

  const resIpv6 = await validateTargetUrl("http://[::1]/");
  console.assert(resIpv6.isValid === false, "IPv6 loopback blocked");

  const resIp = await validateTargetUrl("http://127.0.0.1/admin");
  console.assert(resIp.isValid === false, "127.0.0.1 blocked");

  const resMetadata = await validateTargetUrl("http://169.254.169.254/latest/meta-data/");
  console.assert(resMetadata.isValid === false, "metadata endpoint blocked");
  console.assert(resMetadata.errorCategory === "CLOUD_METADATA_REJECTED", "metadata category");

  const resCreds = await validateTargetUrl("https://user:pass@example.com");
  console.assert(resCreds.isValid === false, "embedded credentials blocked");
  console.assert(resCreds.errorCategory === "EMBEDDED_CREDENTIALS", "creds category");

  const resValid = await validateTargetUrl("https://example.com");
  console.assert(resValid.isValid === true, "example.com allowed");
  console.assert(Boolean(resValid.normalizedUrl), "normalizedUrl exists");

  console.log("All urlValidation unit tests PASS successfully!");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
