import { NextResponse } from "next/server";
import { validateTargetUrl } from "@/lib/tools/urlValidation";
import { captureScreenshotWithCloudflare } from "@/lib/tools/cloudflareBrowser";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url, viewportWidth, viewportHeight, fullPage } = body;

    const validation = await validateTargetUrl(url);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          errorCategory: validation.errorCategory,
          errorMessage: validation.errorMessage,
        },
        { status: 400 }
      );
    }

    const targetUrl = validation.normalizedUrl!;

    const result = await captureScreenshotWithCloudflare({
      url: targetUrl,
      viewportWidth: typeof viewportWidth === "number" ? Math.min(Math.max(viewportWidth, 320), 3840) : 1280,
      viewportHeight: typeof viewportHeight === "number" ? Math.min(Math.max(viewportHeight, 320), 2160) : 800,
      fullPage: Boolean(fullPage),
    });

    if (!result.success) {
      const statusCode =
        result.error.errorCategory === "CONFIG_MISSING"
          ? 500
          : result.error.errorCategory === "CLOUDFLARE_RATE_LIMIT" || result.error.errorCategory === "BROWSER_QUOTA_EXHAUSTED"
          ? 429
          : result.error.errorCategory === "TARGET_TIMEOUT"
          ? 504
          : 502;

      return NextResponse.json(
        {
          success: false,
          errorCategory: result.error.errorCategory,
          errorMessage: result.error.errorMessage,
        },
        { status: statusCode }
      );
    }

    const base64Image = result.imageBuffer.toString("base64");
    const dataUrl = `data:${result.contentType};base64,${base64Image}`;

    return NextResponse.json({
      success: true,
      url: targetUrl,
      resolvedIp: validation.resolvedIp,
      dataUrl,
      contentType: result.contentType,
      sizeBytes: result.imageBuffer.length,
      capturedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        errorCategory: "UNKNOWN_ERROR",
        errorMessage: "The screenshot could not be generated. Please try again.",
      },
      { status: 500 }
    );
  }
}
