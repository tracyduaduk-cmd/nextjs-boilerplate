import { ServiceRequestData } from "./types";

export interface ValidationError {
  field: string;
  message: string;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>?/gm, "");
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidUrl(url: string): boolean {
  if (!url || !url.trim()) return true; // Optional field
  try {
    const formatted = url.startsWith("http") ? url : `https://${url}`;
    new URL(formatted);
    return true;
  } catch {
    return false;
  }
}

export function validateServiceRequest(data: ServiceRequestData): ValidationError[] {
  const errors: ValidationError[] = [];

  // 1. Entry mode & description validation
  if (data.entryMode === "diagnostic") {
    if (!data.problemDescription || data.problemDescription.trim().length < 10) {
      errors.push({
        field: "problemDescription",
        message: "Please describe your technical problem or request in at least 10 characters.",
      });
    }
  }

  if (data.problemDescription && data.problemDescription.length > 4000) {
    errors.push({
      field: "problemDescription",
      message: "Description exceeds maximum length of 4000 characters.",
    });
  }

  // 2. Selected Service / Capability validation
  if (!data.selectedServiceSlug) {
    errors.push({
      field: "selectedServiceSlug",
      message: "Please select a service or capability category.",
    });
  }

  // 3. Contact information validation
  if (!data.contact.name || data.contact.name.trim().length < 2) {
    errors.push({
      field: "contact.name",
      message: "Please enter a valid full name or business contact name.",
    });
  }

  if (data.contact.name && data.contact.name.length > 120) {
    errors.push({
      field: "contact.name",
      message: "Name field is too long.",
    });
  }

  if (!data.contact.email || !isValidEmail(data.contact.email)) {
    errors.push({
      field: "contact.email",
      message: "Please enter a valid email address.",
    });
  }

  if (data.contact.email && data.contact.email.length > 150) {
    errors.push({
      field: "contact.email",
      message: "Email address is too long.",
    });
  }

  if (data.contact.phone && data.contact.phone.length > 50) {
    errors.push({
      field: "contact.phone",
      message: "Phone number field is too long.",
    });
  }

  if (data.contact.company && data.contact.company.length > 150) {
    errors.push({
      field: "contact.company",
      message: "Company name is too long.",
    });
  }

  // 4. URL validations inside answers if present
  if (data.answers) {
    Object.entries(data.answers).forEach(([key, val]) => {
      if ((key.includes("url") || key.includes("website")) && typeof val === "string" && val.trim()) {
        if (!isValidUrl(val)) {
          errors.push({
            field: `answers.${key}`,
            message: `The web address entered in ${key.replace(/_/g, " ")} is invalid.`,
          });
        }
      }
    });
  }

  return errors;
}
