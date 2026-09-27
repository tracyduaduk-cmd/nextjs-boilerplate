import "server-only";
import { createV0Client } from "v0";

const apiKey = process.env.V0_API_KEY;

/**
 * Server-only V0 client for controlled internal workflows.
 * This module is intentionally not imported by client components or public routes.
 */
export function getV0Client() {
  if (!apiKey) {
    throw new Error("V0_API_KEY is not configured");
  }

  return createV0Client({ auth: apiKey });
}

export async function createInternalV0Chat(message: string) {
  if (!message.trim()) throw new Error("A non-empty V0 message is required");
  const client = getV0Client();
  return client.chats.create({ message });
}
