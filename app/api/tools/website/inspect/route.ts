import { NextResponse } from "next/server";
import { validateTargetUrl } from "@/lib/tools/urlValidation";

export interface SecurityHeaderCheck {
  header: string;
  value: string | null;
  status: "observed" | "missing";
  description: string;
}

export interface MetaDiagnosticData {
  url: string;
  finalUrl: string;
  statusCode: number;
  statusText: string;
  resolvedIp?: string;
  responseTimeMs: number;
  contentType: string | null;
  contentLength: string | null;
  server: string | null;

  meta: {
    title: string | null;
    description: string | null;
    canonical: string | null;
    keywords: string | null;
    robots: string | null;
    viewport: string | null;
    charset: string | null;
    language: string | null;
  };

  openGraph: {
    title: string | null;
    description: string | null;
    image: string | null;
    url: string | null;
    type: string | null;
    siteName: string | null;
  };

  twitterCard: {
    card: string | null;
    title: string | null;
    description: string | null;
    image: string | null;
    site: string | null;
  };

  securityHeaders: SecurityHeaderCheck[];
  hstsStatus: {
    present: boolean;
    headerValue: string | null;
  };

  documentDiagnostics: {
    hasDoctype: boolean;
    titleLength: number;
    descriptionLength: number;
    hasFavicon: boolean;
    hasManifest: boolean;
    hasSitemapReference: boolean;
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url } = body;

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
    const startTime = Date.now();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let fetchResponse: Response;
    try {
      fetchResponse = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "User-Agent": "SnowWebDev-Inspector/1.0 (+https://snowwebdev.com)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        redirect: "follow",
        signal: controller.signal,
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === "AbortError") {
        return NextResponse.json(
          {
            success: false,
            errorCategory: "TARGET_TIMEOUT",
            errorMessage: "Target website request timed out after 15 seconds.",
          },
          { status: 504 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          errorCategory: "TARGET_UNREACHABLE",
          errorMessage: "The target website could not be reached. Check the URL and try again.",
        },
        { status: 502 }
      );
    }

    clearTimeout(timeoutId);
    const responseTimeMs = Date.now() - startTime;

    const headers = fetchResponse.headers;
    const statusCode = fetchResponse.status;
    const statusText = fetchResponse.statusText;
    const finalUrl = fetchResponse.url;

    const rawContentType = headers.get("content-type");
    const rawContentLength = headers.get("content-length");
    const rawServer = headers.get("server");

    const hstsValue = headers.get("strict-transport-security");
    const hstsStatus = {
      present: Boolean(hstsValue),
      headerValue: hstsValue,
    };

    const securityHeadersList: SecurityHeaderCheck[] = [
      {
        header: "Strict-Transport-Security (HSTS)",
        value: hstsValue,
        status: hstsValue ? "observed" : "missing",
        description: "Enforces HTTPS connections and prevents SSL stripping.",
      },
      {
        header: "Content-Security-Policy (CSP)",
        value: headers.get("content-security-policy"),
        status: headers.get("content-security-policy") ? "observed" : "missing",
        description: "Mitigates XSS attacks and unauthorized resource injection.",
      },
      {
        header: "X-Frame-Options",
        value: headers.get("x-frame-options"),
        status: headers.get("x-frame-options") ? "observed" : "missing",
        description: "Protects against clickjacking by restricting framing.",
      },
      {
        header: "X-Content-Type-Options",
        value: headers.get("x-content-type-options"),
        status: headers.get("x-content-type-options") ? "observed" : "missing",
        description: "Prevents MIME-type sniffing vulnerabilities.",
      },
      {
        header: "Referrer-Policy",
        value: headers.get("referrer-policy"),
        status: headers.get("referrer-policy") ? "observed" : "missing",
        description: "Controls referrer information sent in HTTP headers.",
      },
      {
        header: "Permissions-Policy",
        value: headers.get("permissions-policy") || headers.get("feature-policy"),
        status: headers.get("permissions-policy") || headers.get("feature-policy") ? "observed" : "missing",
        description: "Restricts browser API access (camera, mic, geolocation).",
      },
    ];

    let htmlText = "";
    if (rawContentType && rawContentType.includes("text/html")) {
      htmlText = await fetchResponse.text().catch(() => "");
    }

    const extractMeta = (regex: RegExp): string | null => {
      const match = htmlText.match(regex);
      return match && match[1] ? match[1].trim() : null;
    };

    const titleMatch = htmlText.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const description =
      extractMeta(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
      extractMeta(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);

    const canonical =
      extractMeta(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) ||
      extractMeta(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);

    const keywords =
      extractMeta(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i) ||
      extractMeta(/<meta\s+content=["']([^"']+)["']\s+name=["']keywords["']/i);

    const robots =
      extractMeta(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i) ||
      extractMeta(/<meta\s+content=["']([^"']+)["']\s+name=["']robots["']/i);

    const viewport =
      extractMeta(/<meta\s+name=["']viewport["']\s+content=["']([^"']+)["']/i) ||
      extractMeta(/<meta\s+content=["']([^"']+)["']\s+name=["']viewport["']/i);

    const charset = extractMeta(/<meta\s+charset=["']([^"']+)["']/i);
    const langMatch = htmlText.match(/<html[^>]*lang=["']([^"']+)["']/i);
    const language = langMatch ? langMatch[1].trim() : null;

    const ogTitle = extractMeta(/<meta\s+(?:property|name)=["']og:title["']\s+content=["']([^"']+)["']/i);
    const ogDescription = extractMeta(/<meta\s+(?:property|name)=["']og:description["']\s+content=["']([^"']+)["']/i);
    const ogImage = extractMeta(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i);
    const ogUrl = extractMeta(/<meta\s+(?:property|name)=["']og:url["']\s+content=["']([^"']+)["']/i);
    const ogType = extractMeta(/<meta\s+(?:property|name)=["']og:type["']\s+content=["']([^"']+)["']/i);
    const ogSiteName = extractMeta(/<meta\s+(?:property|name)=["']og:site_name["']\s+content=["']([^"']+)["']/i);

    const twitterCard = extractMeta(/<meta\s+(?:name|property)=["']twitter:card["']\s+content=["']([^"']+)["']/i);
    const twitterTitle = extractMeta(/<meta\s+(?:name|property)=["']twitter:title["']\s+content=["']([^"']+)["']/i);
    const twitterDescription = extractMeta(/<meta\s+(?:name|property)=["']twitter:description["']\s+content=["']([^"']+)["']/i);
    const twitterImage = extractMeta(/<meta\s+(?:name|property)=["']twitter:image["']\s+content=["']([^"']+)["']/i);
    const twitterSite = extractMeta(/<meta\s+(?:name|property)=["']twitter:site["']\s+content=["']([^"']+)["']/i);

    const inspectionData: MetaDiagnosticData = {
      url: targetUrl,
      finalUrl,
      statusCode,
      statusText,
      resolvedIp: validation.resolvedIp,
      responseTimeMs,
      contentType: rawContentType,
      contentLength: rawContentLength,
      server: rawServer,

      meta: {
        title,
        description,
        canonical,
        keywords,
        robots,
        viewport,
        charset,
        language,
      },

      openGraph: {
        title: ogTitle,
        description: ogDescription,
        image: ogImage,
        url: ogUrl,
        type: ogType,
        siteName: ogSiteName,
      },

      twitterCard: {
        card: twitterCard,
        title: twitterTitle,
        description: twitterDescription,
        image: twitterImage,
        site: twitterSite,
      },

      securityHeaders: securityHeadersList,
      hstsStatus,

      documentDiagnostics: {
        hasDoctype: /<!DOCTYPE\s+html/i.test(htmlText),
        titleLength: title ? title.length : 0,
        descriptionLength: description ? description.length : 0,
        hasFavicon: /<link[^>]*rel=["'](?:shortcut\s+)?icon["']/i.test(htmlText),
        hasManifest: /<link[^>]*rel=["']manifest["']/i.test(htmlText),
        hasSitemapReference: htmlText.toLowerCase().includes("sitemap.xml"),
      },
    };

    return NextResponse.json({
      success: true,
      data: inspectionData,
      inspectedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        errorCategory: "UNKNOWN_ERROR",
        errorMessage: "The inspection could not be completed. Please try again.",
      },
      { status: 500 }
    );
  }
}
