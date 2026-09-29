import { createGateway, streamText, type ModelMessage } from "ai";
import { NextResponse } from "next/server";
import { buildConciergeSystemPrompt } from "@/lib/ai/concierge";
import { determineIntentAndRecommendation, formatRecommendationContext } from "@/lib/ai/recommendations";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TOTAL_LENGTH = 12000;
const DEFAULT_MODEL = "openai/gpt-5.4-mini";

const isMessageRole = (value: unknown): value is "user" | "assistant" => value === "user" || value === "assistant";

function isValidMessage(value: unknown): value is { role: "user" | "assistant"; content: string } {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return isMessageRole(message.role) && typeof message.content === "string" && message.content.trim().length > 0 && message.content.length <= MAX_MESSAGE_LENGTH;
}

export function validateChatMessages(body: unknown): { messages: ModelMessage[]; latestUserMessage: string } | { error: string } {
  if (!body || typeof body !== "object" || !Array.isArray((body as Record<string, unknown>).messages)) {
    return { error: "Send a messages array to Snow Concierge." };
  }

  const rawMessages = (body as { messages: unknown[] }).messages;
  if (rawMessages.length === 0) return { error: "Add a message before sending." };
  if (rawMessages.length > MAX_MESSAGES) return { error: "This conversation is too long. Start a new Concierge session." };
  if (!rawMessages.every(isValidMessage)) return { error: `Each message must contain a role and non-empty text of ${MAX_MESSAGE_LENGTH} characters or fewer.` };

  const totalLength = rawMessages.reduce((total, message) => total + message.content.length, 0);
  if (totalLength > MAX_TOTAL_LENGTH) return { error: "This conversation is too large to process. Start a new Concierge session." };

  const latestUserMessage = [...rawMessages].reverse().find((message) => message.role === "user")?.content.trim();
  if (!latestUserMessage) return { error: "A user message is required." };

  return {
    messages: rawMessages.map((message) => ({ role: message.role, content: message.content.trim() })) as ModelMessage[],
    latestUserMessage,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The request body must be valid JSON." }, { status: 400 });
  }

  const validated = validateChatMessages(body);
  if ("error" in validated) return NextResponse.json({ error: validated.error }, { status: 400 });

  if (!process.env.AI_GATEWAY_API_KEY) {
    return NextResponse.json({ error: "Snow Concierge is temporarily unavailable. The local capability matcher is still available." }, { status: 503 });
  }

  const recommendation = determineIntentAndRecommendation(validated.latestUserMessage);
  const gateway = createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY });
  const model = process.env.AI_MODEL?.trim() || DEFAULT_MODEL;

  try {
    const result = streamText({
      model: gateway(model),
      system: `${buildConciergeSystemPrompt(recommendation)}\n\n${formatRecommendationContext(recommendation)}`,
      messages: validated.messages,
      maxOutputTokens: 700,
      abortSignal: request.signal,
    });

    return result.toTextStreamResponse({
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Snow Concierge could not complete that request. Please retry." }, { status: 502 });
  }
}
