import {
  getAccuracyCategory,
  formatCoordinateDMS,
  calculateHaversineDistanceMeters,
  formatDistance,
  validateIdentifier,
  generateSimulatedDeviceResult,
  getMapProviderInfo,
  getGoogleMapsUrl,
  getGoogleDirectionsUrl,
  SIMULATION_PROGRESS_STEPS,
} from "../../lib/tools/findDevice";

async function runTests() {
  console.log("Running findDevice unit tests...");

  console.assert(getAccuracyCategory(5) === "Excellent", "Accuracy <= 10m is Excellent");
  console.assert(getAccuracyCategory(25) === "Good", "Accuracy <= 35m is Good");
  console.assert(getAccuracyCategory(75) === "Approximate", "Accuracy <= 100m is Approximate");
  console.assert(getAccuracyCategory(200) === "Low confidence", "Accuracy > 100m is Low confidence");

  const dmsPos = formatCoordinateDMS(9.8965, 8.8583);
  console.assert(dmsPos.latDMS.includes("9°") && dmsPos.latDMS.includes("N"), "Positive latitude is N");
  console.assert(dmsPos.lngDMS.includes("8°") && dmsPos.lngDMS.includes("E"), "Positive longitude is E");

  const dmsNeg = formatCoordinateDMS(-33.8688, -151.2093);
  console.assert(dmsNeg.latDMS.includes("33°") && dmsNeg.latDMS.includes("S"), "Negative latitude is S");
  console.assert(dmsNeg.lngDMS.includes("151°") && dmsNeg.lngDMS.includes("W"), "Negative longitude is W");

  const distZero = calculateHaversineDistanceMeters(9.8965, 8.8583, 9.8965, 8.8583);
  console.assert(distZero === 0, "Distance to self is 0m");

  const distLondonParis = calculateHaversineDistanceMeters(51.5074, -0.1278, 48.8566, 2.3522);
  console.assert(distLondonParis > 330000 && distLondonParis < 350000, "London-Paris distance approx 340km");

  console.assert(formatDistance(450) === "450 m", "Format < 1000m as meters");
  console.assert(formatDistance(2500) === "2.50 km", "Format >= 1000m as kilometers");

  const vImei = validateIdentifier("IMEI", "358249091234567");
  console.assert(vImei.isValid === true, "Valid 15 digit IMEI");

  const vImeiBad = validateIdentifier("IMEI", "123");
  console.assert(vImeiBad.isValid === false, "Invalid short IMEI");

  const vPhone = validateIdentifier("Phone", "+2347072299463");
  console.assert(vPhone.isValid === true, "Valid phone number");

  const vPhoneBad = validateIdentifier("Phone", "abc");
  console.assert(vPhoneBad.isValid === false, "Invalid phone number");

  const vEmail = validateIdentifier("Email", "developer@example.com");
  console.assert(vEmail.isValid === true, "Valid email address");

  const vEmailBad = validateIdentifier("Email", "notanemail");
  console.assert(vEmailBad.isValid === false, "Invalid email address");

  const sim1 = generateSimulatedDeviceResult("IMEI", "358249091234567", "Snow Handset");
  console.assert(sim1.isSimulated === true, "Result explicitly marked isSimulated: true");
  console.assert(sim1.disclaimer.includes("SIMULATION"), "Disclaimer mentions SIMULATION");
  console.assert(sim1.deviceName === "Snow Handset", "Uses provided device name");
  console.assert(typeof sim1.latitude === "number", "Generates numeric latitude");
  console.assert(typeof sim1.longitude === "number", "Generates numeric longitude");

  const sim2 = generateSimulatedDeviceResult("IMEI", "358249091234567", "Snow Handset");
  console.assert(sim1.latitude === sim2.latitude, "Deterministic calculation for identical input");

  console.assert(SIMULATION_PROGRESS_STEPS.length === 5, "Progress steps contains 5 sequence stages");

  const provider = getMapProviderInfo();
  console.assert(typeof provider.hasApiKey === "boolean", "Provider info checks API key");

  const mapsUrl = getGoogleMapsUrl(9.8965, 8.8583);
  console.assert(mapsUrl.includes("9.8965,8.8583"), "Google Maps query URL includes lat/lng");

  const dirsUrl = getGoogleDirectionsUrl(9.8965, 8.8583);
  console.assert(dirsUrl.includes("destination=9.8965,8.8583"), "Directions URL includes destination");

  console.log("All findDevice unit tests PASS successfully!");
}

runTests().catch((err) => {
  console.error("findDevice unit test execution failed:", err);
  process.exit(1);
});
