import { CapabilityFamilyId } from "@/lib/services/types";

export type EntryMode = "direct" | "diagnostic";

export type TimelineOption =
  | "exploring"
  | "no_fixed_deadline"
  | "within_month"
  | "within_two_weeks"
  | "urgent"
  | "system_down";

export type BudgetOption =
  | "not_sure"
  | "under_100k"
  | "100k_250k"
  | "250k_500k"
  | "500k_1m"
  | "1m_plus"
  | "prefer_not_to_say";

export type PreferredContact = "email" | "phone" | "whatsapp";

export type RequestStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "quoted"
  | "approved"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface QuestionDefinition {
  id: string;
  label: string;
  subtitle?: string;
  type: "select" | "multiselect" | "text" | "textarea" | "url" | "boolean";
  options?: QuestionOption[];
  placeholder?: string;
  required?: boolean;
  helpText?: string;
}

export interface ServiceRulesConfig {
  serviceSlug: string;
  category: string;
  familyId: CapabilityFamilyId;
  title: string;
  questions: QuestionDefinition[];
  pricingQuoteType: "request_estimate" | "instant_quote";
  securityNotice?: string;
}

export interface DiagnosticResult {
  detectedFamilyId: CapabilityFamilyId;
  recommendedServiceSlug: string;
  recommendedServiceName: string;
  explanation: string;
  confidence: "high" | "medium" | "low";
}

/**
 * Architecture placeholder for real pricing engines in future phases.
 * Currently explicitly configured to NOT generate fake prices.
 */
export interface PricingRule {
  id: string;
  serviceSlug: string;
  baseEstimateMin?: number;
  baseEstimateMax?: number;
  currency: string;
  isInstantQuoteAvailable: boolean;
  notes?: string;
}

export interface QuoteRule {
  ruleId: string;
  conditionKey: string;
  conditionValue: string;
  priceModifier: number;
}

export interface ContactInformation {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferredContact: PreferredContact;
}

export interface ServiceRequestData {
  entryMode: EntryMode;
  selectedFamilyId: CapabilityFamilyId;
  selectedServiceSlug: string;
  selectedServiceId?: string;
  problemDescription: string;
  diagnosticNote?: string;
  answers: Record<string, any>;
  timeline: TimelineOption;
  urgency: string;
  budgetRange?: BudgetOption;
  contact: ContactInformation;
}

export interface ServiceRequestRecord extends ServiceRequestData {
  id: string;
  referenceCode: string;
  status: RequestStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitRequestResponse {
  success: boolean;
  referenceCode?: string;
  record?: ServiceRequestRecord;
  error?: string;
}
