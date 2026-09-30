export interface ScreenshotOptions {
  url: string;
  viewportWidth?: number;
  viewportHeight?: number;
  fullPage?: boolean;
  imageType?: "png" | "jpeg" | "webp";
}

export interface PdfOptions {
  url: string;
  paperFormat?: "A4" | "Letter" | "Legal" | "Tabloid";
  landscape?: boolean;
  printBackground?: boolean;
  pageRanges?: string;
}

export interface CloudflareApiErrorResult {
  errorCategory:
    | "CLOUDFLARE_AUTH_ERROR"
    | "CLOUDFLARE_RATE_LIMIT"
    | "BROWSER_QUOTA_EXHAUSTED"
    | "TARGET_TIMEOUT"
    | "RENDER_FAILED"
    | "CONFIG_MISSING";
  errorMessage: string;
}

export function getCloudflareCredentials(): { accountId: string; apiToken: string } | null {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return null;
  }

  return { accountId, apiToken };
}

export async function captureScreenshotWithCloudflare(
  options: ScreenshotOptions
): Promise<{ success: true; imageBuffer: Buffer; contentType: string } | { success: false; error: CloudflareApiErrorResult }> {
  const creds = getCloudflareCredentials();
  if (!creds) {
    return {
      success: false,
      error: {
        errorCategory: "CONFIG_MISSING",
        errorMessage: "Cloudflare account credentials (CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN) are not configured on the server.",
      },
    };
  }

  const { accountId, apiToken } = creds;
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/screenshot`;

  const payload: Record<string, unknown> = {
    url: options.url,
    viewport: {
      width: options.viewportWidth || 1280,
      height: options.viewportHeight || 800,
    },
    fullPage: options.fullPage ?? false,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      let errorText = "";
      try {
        errorText = (await response.text()).toLowerCase();
      } catch {
        errorText = "";
      }

      if (status === 401 || status === 403) {
        return {
          success: false,
          error: {
            errorCategory: "CLOUDFLARE_AUTH_ERROR",
            errorMessage: "Cloudflare API authentication failed. Verify Account ID and API Token permissions.",
          },
        };
      }

      if (status === 429) {
        return {
          success: false,
          error: {
            errorCategory: "CLOUDFLARE_RATE_LIMIT",
            errorMessage: "Cloudflare Browser Rendering rate limit reached. Please try again shortly.",
          },
        };
      }

      if (errorText.toLowerCase().includes("quota") || errorText.toLowerCase().includes("limit") || status === 402) {
        return {
          success: false,
          error: {
            errorCategory: "BROWSER_QUOTA_EXHAUSTED",
            errorMessage: "BLOCKED BY CLOUDFLARE QUOTA: Cloudflare Workers Free browser daily limit (~10 min/day) exhausted.",
          },
        };
      }

      return {
        success: false,
        error: {
          errorCategory: "RENDER_FAILED",
          errorMessage: `Cloudflare could not render the requested website. Please try again.`,
        },
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get("content-type") || "image/png";

    return {
      success: true,
      imageBuffer: buffer,
      contentType,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === "AbortError") {
      return {
        success: false,
        error: {
          errorCategory: "TARGET_TIMEOUT",
          errorMessage: "Screenshot generation timed out after 35 seconds.",
        },
      };
    }

    return {
      success: false,
      error: {
        errorCategory: "RENDER_FAILED",
        errorMessage: "The external browser service could not reach the requested website. Please try again.",
      },
    };
  }
}

export async function generatePdfWithCloudflare(
  options: PdfOptions
): Promise<{ success: true; pdfBuffer: Buffer; contentType: string } | { success: false; error: CloudflareApiErrorResult }> {
  const creds = getCloudflareCredentials();
  if (!creds) {
    return {
      success: false,
      error: {
        errorCategory: "CONFIG_MISSING",
        errorMessage: "Cloudflare account credentials (CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN) are not configured on the server.",
      },
    };
  }

  const { accountId, apiToken } = creds;
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/pdf`;

  const payload: Record<string, unknown> = {
    url: options.url,
    format: options.paperFormat || "A4",
    landscape: options.landscape ?? false,
    printBackground: options.printBackground ?? true,
  };

  if (options.pageRanges) {
    payload.pageRanges = options.pageRanges;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      let errorText = "";
      try {
        errorText = (await response.text()).toLowerCase();
      } catch {
        errorText = "";
      }

      if (status === 401 || status === 403) {
        return {
          success: false,
          error: {
            errorCategory: "CLOUDFLARE_AUTH_ERROR",
            errorMessage: "Cloudflare API authentication failed. Verify Account ID and API Token permissions.",
          },
        };
      }

      if (status === 429) {
        return {
          success: false,
          error: {
            errorCategory: "CLOUDFLARE_RATE_LIMIT",
            errorMessage: "Cloudflare Browser Rendering rate limit reached. Please try again shortly.",
          },
        };
      }

      if (errorText.toLowerCase().includes("quota") || errorText.toLowerCase().includes("limit") || status === 402) {
        return {
          success: false,
          error: {
            errorCategory: "BROWSER_QUOTA_EXHAUSTED",
            errorMessage: "BLOCKED BY CLOUDFLARE QUOTA: Cloudflare Workers Free browser daily limit (~10 min/day) exhausted.",
          },
        };
      }

      return {
        success: false,
        error: {
          errorCategory: "RENDER_FAILED",
          errorMessage: `Cloudflare could not generate the requested PDF. Please try again.`,
        },
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return {
      success: true,
      pdfBuffer: buffer,
      contentType: "application/pdf",
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === "AbortError") {
      return {
        success: false,
        error: {
          errorCategory: "TARGET_TIMEOUT",
          errorMessage: "PDF generation timed out after 35 seconds.",
        },
      };
    }

    return {
      success: false,
      error: {
        errorCategory: "RENDER_FAILED",
        errorMessage: "The external browser service could not reach the requested website. Please try again.",
      },
    };
  }
}
