export type CapabilityFamilyId =
  | "WEB"
  | "APPS & SOFTWARE"
  | "INFRASTRUCTURE"
  | "SECURITY & RECOVERY"
  | "AI"
  | "DEVICES & HARDWARE"
  | "BUSINESS IT"
  | "DIGITAL GROWTH";

export interface ServiceRecord {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string | null;
  category: string;
  capability_family: CapabilityFamilyId | string;
  icon: string | null;
  featured: boolean;
  sort_order: number;
  capabilities: string[];
  what_we_help_with: string[];
  process: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CapabilityFamilyMeta {
  id: CapabilityFamilyId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  colorAccent: "sky" | "indigo" | "emerald" | "amber" | "rose" | "cyan" | "violet" | "teal";
  badge: string;
}

export interface ProblemOption {
  id: string;
  title: string;
  subtitle: string;
  capabilityFamily: CapabilityFamilyId;
  recommendedSlug: string;
  badge: string;
}
