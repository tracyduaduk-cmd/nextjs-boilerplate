export type LocationStatus =
  | "READY"
  | "REQUESTING_PERMISSION"
  | "LOCATING"
  | "LOCATED"
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "UNSUPPORTED"
  | "ERROR";

export type AccuracyCategory = "Excellent" | "Good" | "Approximate" | "Low confidence";

export interface RealLocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  accuracyCategory: AccuracyCategory;
}

export type IdentifierType = "IMEI" | "Phone" | "Email";

export interface SimulatedDeviceData {
  identifierType: IdentifierType;
  identifierValue: string;
  deviceName: string;
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  batteryPercent: number;
  batteryStatus: string;
  signalStrengthDbm: number;
  signalQuality: string;
  networkType: string;
  carrierSimulated: string;
  lastSeenTimestamp: string;
  deviceStatus: string;
  isSimulated: true;
  disclaimer: string;
}

export interface SessionPoint {
  id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  distanceFromPrevMeters: number | null;
  label: string;
}

export interface MapProviderInfo {
  provider: "google" | "snow-spatial";
  hasApiKey: boolean;
  googleApiKey?: string;
}

export function getAccuracyCategory(accuracyMeters: number): AccuracyCategory {
  if (accuracyMeters <= 10) return "Excellent";
  if (accuracyMeters <= 35) return "Good";
  if (accuracyMeters <= 100) return "Approximate";
  return "Low confidence";
}

export function formatCoordinateDMS(lat: number, lng: number): { latDMS: string; lngDMS: string } {
  const toDMS = (deg: number, isLat: boolean) => {
    const absolute = Math.abs(deg);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);
    const direction = isLat ? (deg >= 0 ? "N" : "S") : deg >= 0 ? "E" : "W";
    return degrees + "° " + minutes + "' " + seconds + "\" " + direction;
  };

  return {
    latDMS: toDMS(lat, true),
    lngDMS: toDMS(lng, false),
  };
}

export function calculateHaversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return meters + " m";
  }
  return (meters / 1000).toFixed(2) + " km";
}

export function validateIdentifier(
  type: IdentifierType,
  value: string
): { isValid: boolean; error?: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, error: type + " identifier is required." };
  }

  if (type === "IMEI") {
    const cleanImei = trimmed.replace(/[\s-]/g, "");
    if (!/^\d{14,16}$/.test(cleanImei)) {
      return { isValid: false, error: "IMEI must contain 14 to 16 digits." };
    }
  } else if (type === "Phone") {
    const cleanPhone = trimmed.replace(/[\s\-\(\)\.]/g, "");
    if (!/^\+?\d{7,15}$/.test(cleanPhone)) {
      return { isValid: false, error: "Phone number must be a valid format (7-15 digits)." };
    }
  } else if (type === "Email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return { isValid: false, error: "Enter a valid email address." };
    }
  }

  return { isValid: true };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateSimulatedDeviceResult(
  type: IdentifierType,
  value: string,
  deviceNameInput?: string
): SimulatedDeviceData {
  const hash = hashString(type + ":" + value.trim().toLowerCase());

  const sampleHubs = [
    { name: "Jos, Plateau State, NG", lat: 9.8965, lng: 8.8583 },
    { name: "Lagos, NG", lat: 6.5244, lng: 3.3792 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278 },
    { name: "Tokyo, JP", lat: 35.6762, lng: 139.6503 },
    { name: "San Francisco, US", lat: 37.7749, lng: -122.4194 },
    { name: "Frankfurt, DE", lat: 50.1109, lng: 8.6821 },
    { name: "Singapore, SG", lat: 1.3521, lng: 103.8198 },
  ];

  const hub = sampleHubs[hash % sampleHubs.length];
  const latOffset = ((hash % 100) - 50) * 0.001;
  const lngOffset = (((hash >> 2) % 100) - 50) * 0.001;

  const simulatedLat = Number((hub.lat + latOffset).toFixed(6));
  const simulatedLng = Number((hub.lng + lngOffset).toFixed(6));

  const carriers = [
    "Snow Telecommunications Demo",
    "AeroNet Global Cellular",
    "Orbital Mobile Synthetic",
    "Aether Carrier Simulation",
  ];
  const carrier = carriers[hash % carriers.length];

  const defaultName = deviceNameInput?.trim() || (type + " Target " + value.slice(-4));

  return {
    identifierType: type,
    identifierValue: value.trim(),
    deviceName: defaultName,
    latitude: simulatedLat,
    longitude: simulatedLng,
    accuracyMeters: 15 + (hash % 35),
    batteryPercent: 42 + (hash % 55),
    batteryStatus: hash % 2 === 0 ? "Discharging (Simulated)" : "Charging (Simulated)",
    signalStrengthDbm: -65 - (hash % 35),
    signalQuality: hash % 3 === 0 ? "Excellent" : hash % 3 === 1 ? "Strong" : "Moderate",
    networkType: hash % 2 === 0 ? "5G Sub6 (Simulated)" : "LTE Advanced (Simulated)",
    carrierSimulated: carrier,
    lastSeenTimestamp: new Date().toLocaleTimeString(),
    deviceStatus: "ACTIVE_BEACON_SIMULATED",
    isSimulated: true,
    disclaimer: "SIMULATION / DEMO MODE — Local fictional calculation. Does NOT query real telecommunication networks or tracking services.",
  };
}

export const SIMULATION_PROGRESS_STEPS = [
  { id: 1, label: "IDENTIFIER ACCEPTED", description: "Validating identifier format locally" },
  { id: 2, label: "INITIALIZING RECOVERY SIMULATION", description: "Preparing local spatial calculation" },
  { id: 3, label: "SIMULATING NETWORK HANDSHAKE", description: "Simulating carrier beacon triangulation" },
  { id: 4, label: "SIMULATING LOCATION RESOLUTION", description: "Resolving synthetic spatial coordinates" },
  { id: 5, label: "SIMULATED DEVICE LOCATED", description: "Generated demo spatial beacon complete" },
];

export function getMapProviderInfo(): MapProviderInfo {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (apiKey && apiKey.trim().length > 0) {
    return {
      provider: "google",
      hasApiKey: true,
      googleApiKey: apiKey,
    };
  }
  return {
    provider: "snow-spatial",
    hasApiKey: false,
  };
}

export function getGoogleMapsUrl(lat: number, lng: number): string {
  return "https://www.google.com/maps?q=" + lat + "," + lng;
}

export function getGoogleDirectionsUrl(lat: number, lng: number): string {
  return "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng;
}
