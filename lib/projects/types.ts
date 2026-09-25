export type MediaType = "image" | "screenshot" | "video" | "embed";

export interface ProjectMediaRecord {
  id: string;
  project_id: string;
  media_type: MediaType | string;
  title: string | null;
  url: string;
  thumbnail_url: string | null;
  provider: string | null;
  alt_text: string | null;
  sort_order: number;
  created_at?: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  client_name: string | null;
  category: string;
  summary: string;
  description: string | null;
  problem: string | null;
  solution: string | null;
  results: string | null;
  technologies: string[];
  featured: boolean;
  live_url: string | null;
  github_url: string | null;
  year: number | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  media?: ProjectMediaRecord[];
}

export type ProjectCategoryFilter =
  | "All"
  | "E-commerce"
  | "Web App"
  | "Dashboard"
  | "AI"
  | "Business Software"
  | "Website"
  | "Platform"
  | "Digital Support";
