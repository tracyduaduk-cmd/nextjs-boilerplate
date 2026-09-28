import { NextResponse } from "next/server";
import { validateTargetUrl } from "@/lib/tools/urlValidation";
import { generatePdfWithCloudflare } from "@/lib/tools/cloudflareBrowser";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url, paperFormat, landscape, printBackground } = body;

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

    const result = await generatePdfWithCloudflare({
      url: targetUrl,
      paperFormat: ["A4", "Letter", "Legal", "Tabloid"].includes(paperFormat) ? paperFormat : "A4",
      landscape: Boolean(landscape),
      printBackground: printBackground !== false,
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

    const base64Pdf = result.pdfBuffer.toString("base64");
    const dataUrl = `data:application/pdf;base64,${base64Pdf}`;

    return NextResponse.json({
      success: true,
      url: targetUrl,
      resolvedIp: validation.resolvedIp,
      dataUrl,
      contentType: "application/pdf",
      sizeBytes: result.pdfBuffer.length,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        errorCategory: "UNKNOWN_ERROR",
        errorMessage: err instanceof Error ? err.message : "An unexpected server error occurred.",
      },
      { status: 500 }
    );
  }
}
