import { absoluteUrl } from "@/lib/seo";

type JsonLdProps = { data: Record<string, unknown> };

export function StructuredData({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SnowStructuredData() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Snow",
          url: absoluteUrl("/"),
          description:
            "Snow is a technology studio for web applications, AI workflows, digital products, and developer utilities.",
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Snow Technology Studio",
          url: absoluteUrl("/"),
          description:
            "A technology studio engineering high-performance web applications, intelligent AI workflows, and resilient digital infrastructure.",
        }}
      />
    </>
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}
