import { supabase } from "@/lib/services/supabaseClient";
import { ServiceRequestData, SubmitRequestResponse, ServiceRequestRecord } from "./types";
import { validateServiceRequest, sanitizeInput } from "./validation";

/**
 * Generates a human-friendly unique reference code for technical requests.
 * Format: SNW-XXXXXX (e.g., SNW-8K92PF)
 */
export function generateReferenceCode(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // Exclude ambiguous chars like 0/O, 1/I
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SNW-${code}`;
}

/**
 * Submits a validated service request to the Supabase database.
 */
export async function submitServiceRequest(
  data: ServiceRequestData
): Promise<SubmitRequestResponse> {
  // 1. Validate payload
  const validationErrors = validateServiceRequest(data);
  if (validationErrors.length > 0) {
    return {
      success: false,
      error: validationErrors[0].message,
    };
  }

  // 2. Prepare reference code and clean values
  const referenceCode = generateReferenceCode();
  const sanitizedName = sanitizeInput(data.contact.name);
  const sanitizedEmail = data.contact.email.trim().toLowerCase();
  const sanitizedPhone = data.contact.phone ? sanitizeInput(data.contact.phone) : null;
  const sanitizedCompany = data.contact.company ? sanitizeInput(data.contact.company) : null;
  const sanitizedProblem = data.problemDescription
    ? sanitizeInput(data.problemDescription)
    : null;

  // Combine diagnostic note or context into structured answers JSON
  const combinedAnswers = {
    ...data.answers,
    ...(data.diagnosticNote ? { _diagnosticNote: data.diagnosticNote } : {}),
  };

  const payload = {
    reference_code: referenceCode,
    service_id: data.selectedServiceId || null,
    capability_family: data.selectedFamilyId,
    request_type: data.entryMode,
    status: "new",
    name: sanitizedName,
    email: sanitizedEmail,
    phone: sanitizedPhone,
    company: sanitizedCompany,
    preferred_contact: data.contact.preferredContact || "email",
    problem_description: sanitizedProblem,
    answers: combinedAnswers,
    timeline: data.timeline,
    urgency: data.urgency || "normal",
    budget_range: data.budgetRange || "not_sure",
    source: "web",
  };

  try {
    // Note: Do not chain .select() on INSERT for anonymous public submissions
    // because RLS restricts SELECT on submitted requests for privacy.
    const { error } = await supabase
      .from("service_requests")
      .insert([payload]);

    if (error) {
      console.error("Supabase request submission error:", error);
      return {
        success: false,
        error: "An error occurred while submitting your request. Please try again or contact support.",
      };
    }

    const record: ServiceRequestRecord = {
      ...data,
      id: referenceCode,
      referenceCode,
      status: "new",
      source: "web",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      referenceCode,
      record,
    };
  } catch (err) {
    console.error("Unexpected error during request submission:", err);
    return {
      success: false,
      error: "Unable to complete request submission due to a temporary network issue.",
    };
  }
}
