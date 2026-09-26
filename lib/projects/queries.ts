import { supabase } from "@/lib/services/supabaseClient";
import { ProjectRecord, ProjectMediaRecord, ProjectWithMedia } from "./types";

const FALLBACK_PROJECTS: ProjectWithMedia[] = [
  {
    id: "7022dad7-1aa5-46a5-9100-793e6ec7cd66",
    slug: "aurora-commerce",
    title: "Aurora Commerce",
    client_name: null,
    category: "E-commerce",
    summary: "A polished storefront concept for a modern digital commerce brand.",
    description: "Aurora Commerce is an exploration of sub-100ms e-commerce interaction design and modular catalog management.",
    problem: "How might a growing commerce brand make browsing and buying feel faster, clearer and more premium?",
    solution: "A modular storefront concept with strong product presentation, responsive navigation and a streamlined shopping journey.",
    results: "Concept demonstration — not a client project.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Vercel"],
    featured: true,
    live_url: null,
    github_url: null,
    year: 2026,
    sort_order: 1,
    media: [
      {
        id: "fdf00af5-d023-4aa4-8cf2-7b6808cd6172",
        project_id: "7022dad7-1aa5-46a5-9100-793e6ec7cd66",
        media_type: "image",
        title: "Hero visual",
        url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/aurora-commerce/hero.webp",
        thumbnail_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/aurora-commerce/hero.webp",
        provider: "supabase",
        alt_text: "Aurora Commerce concept demo hero preview",
        sort_order: 1,
      },
      {
        id: "6e415a9c-a042-48b2-a2fe-b0b0599251cf",
        project_id: "7022dad7-1aa5-46a5-9100-793e6ec7cd66",
        media_type: "image",
        title: "Desktop visual",
        url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/aurora-commerce/desktop.webp",
        thumbnail_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/aurora-commerce/desktop.webp",
        provider: "supabase",
        alt_text: "Aurora Commerce desktop interface concept screenshot",
        sort_order: 2,
      },
      {
        id: "c900f06f-d596-4df1-a75b-94c035973fa1",
        project_id: "7022dad7-1aa5-46a5-9100-793e6ec7cd66",
        media_type: "image",
        title: "Mobile visual",
        url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/aurora-commerce/mobile.webp",
        thumbnail_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/aurora-commerce/mobile.webp",
        provider: "supabase",
        alt_text: "Aurora Commerce mobile interface concept screenshot",
        sort_order: 3,
      },
    ],
  },
  {
    id: "02e05a53-4768-4326-b46b-d3c5ef219a3d",
    slug: "pulse-health",
    title: "Pulse Health",
    client_name: null,
    category: "Web App",
    summary: "A calm appointment and customer portal concept for a service business.",
    description: "Pulse Health focuses on reducing administrative overhead for service businesses via structured workflows.",
    problem: "How can a service portal reduce friction around scheduling and account management?",
    solution: "A simple booking flow with clear states, responsive dashboards and accessible information architecture.",
    results: "Concept demonstration — not a client project.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase"],
    featured: true,
    live_url: null,
    github_url: null,
    year: 2026,
    sort_order: 2,
    media: [
      {
        id: "5663d52c-7625-47fb-9943-965c22e4a84e",
        project_id: "02e05a53-4768-4326-b46b-d3c5ef219a3d",
        media_type: "image",
        title: "Hero visual",
        url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/pulse-health/hero.webp",
        thumbnail_url: "https://jwetpisuobxyypgofvsd.supabase.co/storage/v1/object/public/snow-media/projects/pulse-health/hero.webp",
        provider: "supabase",
        alt_text: "Pulse Health concept demo hero preview",
        sort_order: 1,
      },
    ],
  },
];

export async function fetchProjects(): Promise<ProjectWithMedia[]> {
  try {
    const { data: projectsData, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (projectsError || !projectsData) {
      console.warn("Failed to fetch projects from Supabase, using static fallback:", projectsError?.message);
      return FALLBACK_PROJECTS;
    }

    const { data: mediaData, error: mediaError } = await supabase
      .from("project_media")
      .select("*")
      .order("sort_order", { ascending: true });

    if (mediaError) {
      console.warn("Failed to fetch project_media from Supabase:", mediaError.message);
    }

    const allMedia = (mediaData as ProjectMediaRecord[]) || [];

    return (projectsData as ProjectRecord[]).map((proj) => {
      const projMedia = allMedia.filter((m) => m.project_id === proj.id);

      const hero = projMedia.find((m) => m.url.endsWith("/hero.webp") || m.sort_order === 1) || projMedia[0];
      const desktop = projMedia.find((m) => m.url.endsWith("/desktop.webp") || m.sort_order === 2);
      const mobile = projMedia.find((m) => m.url.endsWith("/mobile.webp") || m.sort_order === 3);

      return {
        ...proj,
        media: projMedia,
        hero_media: hero,
        desktop_media: desktop,
        mobile_media: mobile,
        screenshots: projMedia.filter((m) => m.id !== hero?.id),
      };
    });
  } catch (err) {
    console.error("Unexpected error fetching projects:", err);
    return FALLBACK_PROJECTS;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectWithMedia | null> {
  const projects = await fetchProjects();
  const project = projects.find((p) => p.slug === slug);
  return project || null;
}
