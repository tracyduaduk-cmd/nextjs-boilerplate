export type NetworkId = "all" | "mtn" | "airtel" | "glo" | "9mobile";

export type CodeCategory =
  | "balance"
  | "recharge"
  | "data"
  | "borrow"
  | "dnd"
  | "nin"
  | "porting"
  | "support"
  | "vas";

export interface ShortCodeEntry {
  id: string;
  code: string;
  displayCode: string; // e.g., "*310#" or "2442"
  protocol: "USSD" | "SMS" | "VOICE";
  service: string;
  category: CodeCategory;
  description: string;
  howToUse: string;
  applicableNetworks: ("MTN" | "Airtel" | "Glo" | "9mobile")[];
  sourceName: string;
  sourceUrl: string;
  lastVerified: string; // YYYY-MM-DD
  isHarmonized: boolean;
  notes?: string;
}

export interface OperatorInfo {
  id: NetworkId;
  name: string;
  fullName: string;
  accentColor: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  officialWebsite: string;
  supportPhone: string;
  supportEmail?: string;
  verifiedCodes: ShortCodeEntry[];
  unverifiedNotes?: string;
  lastVerified: string;
}

export interface DndCommand {
  command: string;
  shortCode: string;
  purpose: string;
  description: string;
  example: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  code: string;
  displayCode: string;
  category: CodeCategory;
  protocol: "USSD" | "SMS" | "VOICE";
  description: string;
  accentColor: string;
}
