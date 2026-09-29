import { NextRequest, NextResponse } from "next/server";
import { streamText, createGateway } from "ai";
import { SNOW_CONCIERGE_SYSTEM_PROMPT } from "@/lib/ai/conciergePrompt";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json(
        {
          error: "AI Gateway API key is missing on the server. Snow Intelligent Concierge is operating in offline mode.",
        },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Request body must be an object." }, { status: 400 });
    }

    const { messages } = body as { messages?: Array<{ role?: string; content?: string }> };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing or invalid 'messages' array in request body." }, { status: 400 });
    }

    if (messages.length > 20) {
      return NextResponse.json({ error: "Conversation message limit exceeded (max 20 messages)." }, { status: 400 });
    }

    const formattedMessages: Array<{ role: "user" | "assistant" | "system"; content: string }> = [];

    for (const msg of messages) {
      if (!msg || typeof msg !== "object") {
        return NextResponse.json({ error: "Invalid message entry in 'messages'." }, { status: 400 });
      }
      const role = msg.role;
      const content = msg.content;

      if (role !== "user" && role !== "assistant" && role !== "system") {
        return NextResponse.json({ error: `Unsupported role: ${String(role)}` }, { status: 400 });
      }

      if (typeof content !== "string") {
        return NextResponse.json({ error: "Message content must be a string." }, { status: 400 });
      }

      if (content.length > 2000) {
        return NextResponse.json({ error: "Message content exceeds length limit of 2000 characters." }, { status: 400 });
      }

      formattedMessages.push({ role, content });
    }

    const modelId = process.env.AI_MODEL?.trim() || "openai/gpt-4o-mini";

    const gateway = createGateway({ apiKey });
    const model = gateway(modelId);

    const result = streamText({
      model,
      system: SNOW_CONCIERGE_SYSTEM_PROMPT,
      messages: formattedMessages,
    });

    return result.toTextStreamResponse();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json(
      { error: "Snow Concierge AI Service error", detail: message },
      { status: 500 }
    );
  }
}
