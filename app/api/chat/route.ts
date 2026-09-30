import { createGateway, streamText } from "ai";
import { NextResponse } from "next/server";
import { buildConciergeSystemPrompt } from "@/lib/ai/concierge";
import { determineIntentAndRecommendation, formatRecommendationContext } from "@/lib/ai/recommendations";
import { validateChatMessages } from "@/lib/ai/chatValidation";

const DEFAULT_MODEL = "openai/gpt-5.4-mini";
const STREAM_ERROR_PREFIX = "\u0000SNOW_CONCIERGE_ERROR\u0000";

function safeStreamError(error: unknown) {
  const message = error instanceof Error ? error.message : "unknown error";
  console.error("[snow-concierge] generation failed", { message: message.slice(0, 240) });
  return "Snow Concierge is temporarily unavailable. Your local capability match is still ready below.";
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
    return NextResponse.json(
      { error: "Snow Concierge is temporarily unavailable. The local capability matcher is still available." },
      { status: 503 },
    );
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
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const part of result.fullStream) {
            if (part.type === "text-delta") controller.enqueue(encoder.encode(part.text));
            if (part.type === "error") {
              controller.enqueue(encoder.encode(`${STREAM_ERROR_PREFIX}${safeStreamError(part.error)}`));
            }
          }
        } catch (error) {
          controller.enqueue(encoder.encode(`${STREAM_ERROR_PREFIX}${safeStreamError(error)}`));
        } finally {
          controller.close();
        }
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[snow-concierge] request setup failed", {
      message: error instanceof Error ? error.message.slice(0, 240) : "unknown error",
    });
    return NextResponse.json({ error: "Snow Concierge could not complete that request. Please retry." }, { status: 502 });
  }
}
