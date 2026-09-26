export type InsightCategory = "Build" | "Grow" | "AI" | "Protect" | "Operate";

export interface RelatedItem {
  name: string;
  href: string;
  description: string;
}

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  publishedAt: string;
  readingTime: string;
  author: string;
  featured?: boolean;
  keyTakeaways: string[];
  content: {
    heading: string;
    paragraphs: string[];
  }[];
  relatedServices?: RelatedItem[];
  relatedTools?: RelatedItem[];
  relatedCare?: RelatedItem[];
}
