import type { ModelMessage } from "ai";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TOTAL_LENGTH = 12000;

type ValidChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const isMessageRole = (value: unknown): value is ValidChatMessage["role"] =>
  value === "user" || value === "assistant";

function isValidMessage(value: unknown): value is ValidChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    isMessageRole(message.role) &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

export function validateChatMessages(
  body: unknown,
): { messages: ModelMessage[]; latestUserMessage: string } | { error: string } {
  if (
    !body ||
    typeof body !== "object" ||
    !Array.isArray((body as Record<string, unknown>).messages)
  ) {
    return { error: "Send a messages array to Snow Concierge." };
  }

  const rawMessages = (body as { messages: unknown[] }).messages;
  if (rawMessages.length === 0) return { error: "Add a message before sending." };
  if (rawMessages.length > MAX_MESSAGES) {
    return { error: "This conversation is too long. Start a new Concierge session." };
  }
  if (!rawMessages.every(isValidMessage)) {
    return {
      error: `Each message must contain a role and non-empty text of ${MAX_MESSAGE_LENGTH} characters or fewer.`,
    };
  }

  const totalLength = rawMessages.reduce(
    (total, message) => total + message.content.length,
    0,
  );
  if (totalLength > MAX_TOTAL_LENGTH) {
    return {
      error: "This conversation is too large to process. Start a new Concierge session.",
    };
  }

  const latestUserMessage = [...rawMessages]
    .reverse()
    .find((message) => message.role === "user")
    ?.content.trim();
  if (!latestUserMessage) return { error: "A user message is required." };

  return {
    messages: rawMessages.map((message) => ({
      role: message.role,
      content: message.content.trim(),
    })) as ModelMessage[],
    latestUserMessage,
  };
}
