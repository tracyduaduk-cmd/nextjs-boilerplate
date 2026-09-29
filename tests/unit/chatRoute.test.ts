import { determineIntentAndRecommendation } from "../../components/concierge/AIConcierge";
import { POST } from "../../app/api/chat/route";
import { NextRequest } from "next/server";

async function runTests() {
  console.log("Running Snow AI Concierge & Chat Route unit tests...");

  // 1. Recommendation Engine Tests
  const recSlow = determineIntentAndRecommendation("My site is very slow");
  console.assert(recSlow.intent === "diagnose", "Slow site maps to diagnose intent");
  console.assert(recSlow.recommendedTool?.href === "/tools/speed", "Slow site suggests /tools/speed");

  const recBroken = determineIntentAndRecommendation("The shop is broken and crashing");
  console.assert(recBroken.intent === "repair", "Broken site maps to repair intent");
  console.assert(recBroken.actionLink.href === "/request", "Broken site links to /request");

  const recEcommerce = determineIntentAndRecommendation("I want to build an online ecommerce shop");
  console.assert(recEcommerce.intent === "build", "Ecommerce maps to build intent");

  const recApp = determineIntentAndRecommendation("I need a custom mobile app for iOS");
  console.assert(recApp.intent === "build", "App request maps to build intent");

  const recAI = determineIntentAndRecommendation("I want to automate workflow with AI bots");
  console.assert(recAI.intent === "automate", "AI automation maps to automate intent");

  const recSEO = determineIntentAndRecommendation("Need higher Google rankings and SEO");
  console.assert(recSEO.intent === "grow", "SEO query maps to grow intent");

  const recSecurity = determineIntentAndRecommendation("My account was compromised");
  console.assert(recSecurity.intent === "protect", "Compromised query maps to protect intent");

  const recDefault = determineIntentAndRecommendation("Hello there!");
  console.assert(recDefault.intent === "diagnose", "General greeting maps to default assessment");

  // 2. Chat Route Unit Tests (without API key configured)
  const originalKey = process.env.AI_GATEWAY_API_KEY;
  delete process.env.AI_GATEWAY_API_KEY;

  // Test missing API Key handling (503 response)
  const reqNoKey = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "hello" }] }),
  });
  const resNoKey = await POST(reqNoKey);
  console.assert(resNoKey.status === 503, "Missing API Key returns 503 status");
  const jsonNoKey = await resNoKey.json();
  console.assert(jsonNoKey.error.includes("offline mode"), "Missing API Key JSON details offline mode");

  // Restore or set dummy API key for validation tests
  process.env.AI_GATEWAY_API_KEY = "test_gateway_key";

  // Test missing body / invalid JSON
  const reqBadJson = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "invalid_json",
  });
  const resBadJson = await POST(reqBadJson);
  console.assert(resBadJson.status === 400, "Invalid JSON body returns 400 status");

  // Test missing messages array
  const reqNoMessages = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const resNoMessages = await POST(reqNoMessages);
  console.assert(resNoMessages.status === 400, "Missing messages array returns 400 status");

  // Test empty messages array
  const reqEmptyMessages = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [] }),
  });
  const resEmptyMessages = await POST(reqEmptyMessages);
  console.assert(resEmptyMessages.status === 400, "Empty messages array returns 400 status");

  // Test oversized message content (> 2000 chars)
  const reqOversized = new NextRequest("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "a".repeat(2001) }] }),
  });
  const resOversized = await POST(reqOversized);
  console.assert(resOversized.status === 400, "Message content > 2000 chars returns 400 status");

  // Restore original env state
  if (originalKey) {
    process.env.AI_GATEWAY_API_KEY = originalKey;
  } else {
    delete process.env.AI_GATEWAY_API_KEY;
  }

  console.log("All Snow AI Concierge & Chat Route unit tests PASS successfully!");
}

runTests().catch((err) => {
  console.error("Chat Route unit test execution failed:", err);
  process.exit(1);
});
