import { supabase } from "@/lib/services/supabaseClient";
import { ProjectRecord, ProjectMediaRecord, ProjectWithMedia } from "./types";

const FALLBACK_PROJECTS: ProjectWithMedia[] = [
  {
    id: "7022dad7-1aa5-46a5-9100-793e6ec7cd66",
    slug: "aurora-commerce",
    title: "Aurora Commerce",
    client_name: "Snow Concept Lab",
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
        title: "Hero preview",
        url: "https://placehold.co/1600x1000/png?text=Aurora+Commerce+%7C+Concept+Demo",
        thumbnail_url: "https://placehold.co/800x500/png?text=Aurora+Commerce+%7C+Concept+Demo",
        provider: null,
        alt_text: "Aurora Commerce concept demo hero preview",
        sort_order: 1,
      },
      {
        id: "6e415a9c-a042-48b2-a2fe-b0b0599251cf",
        project_id: "7022dad7-1aa5-46a5-9100-793e6ec7cd66",
        media_type: "screenshot",
        title: "Desktop interface preview",
        url: "https://placehold.co/1600x1000/png?text=Aurora+Commerce+%7C+Desktop+Concept",
        thumbnail_url: "https://placehold.co/800x500/png?text=Aurora+Commerce+%7C+Desktop+Concept",
        provider: null,
        alt_text: "Aurora Commerce desktop interface concept screenshot",
        sort_order: 2,
      },
      {
        id: "c900f06f-d596-4df1-a75b-94c035973fa1",
        project_id: "7022dad7-1aa5-46a5-9100-793e6ec7cd66",
        media_type: "screenshot",
        title: "Mobile interface preview",
        url: "https://placehold.co/900x1400/png?text=Aurora+Commerce+%7C+Mobile+Concept",
        thumbnail_url: "https://placehold.co/450x700/png?text=Aurora+Commerce+%7C+Mobile+Concept",
        provider: null,
        alt_text: "Aurora Commerce mobile interface concept screenshot",
        sort_order: 3,
      },
    ],
  },
  {
    id: "02e05a53-4768-4326-b46b-d3c5ef219a3d",
    slug: "pulse-health",
    title: "Pulse Health",
    client_name: "Snow Concept Lab",
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
        title: "Hero preview",
        url: "https://placehold.co/1600x1000/png?text=Pulse+Health+%7C+Concept+Demo",
        thumbnail_url: "https://placehold.co/800x500/png?text=Pulse+Health+%7C+Concept+Demo",
        provider: null,
        alt_text: "Pulse Health concept demo hero preview",
        sort_order: 1,
      },
    ],
  },
  {
    id: "37635a0f-29f3-4c18-8607-7876c2d859e3",
    slug: "orbit-finance",
    title: "Orbit Finance",
    client_name: "Snow Concept Lab",
    category: "Dashboard",
    summary: "A modern financial dashboard concept focused on clarity and information hierarchy.",
    description: "Orbit Finance translates telemetry and financial flows into low-cognitive-load spatial charts.",
    problem: "How can a complex dashboard communicate important information without overwhelming the user?",
    solution: "A structured dashboard with clear summaries, transaction views and responsive layouts.",
    results: "Concept demonstration — not a client project.",
    technologies: ["Next.js", "TypeScript", "React", "Charts"],
    featured: true,
    live_url: null,
    github_url: null,
    year: 2026,
    sort_order: 3,
    media: [
      {
        id: "fe4ca590-0c09-49a2-8dc0-fa7a889c0e81",
        project_id: "37635a0f-29f3-4c18-8607-7876c2d859e3",
        media_type: "image",
        title: "Hero preview",
        url: "https://placehold.co/1600x1000/png?text=Orbit+Finance+%7C+Concept+Demo",
        thumbnail_url: "https://placehold.co/800x500/png?text=Orbit+Finance+%7C+Concept+Demo",
        provider: null,
        alt_text: "Orbit Finance concept demo hero preview",
        sort_order: 1,
      },
    ],
  },
  {
    id: "eb9741fc-ffac-4110-8004-7ed37c512879",
    slug: "nova-ai-assistant",
    title: "Nova AI Assistant",
    client_name: "Snow Concept Lab",
    category: "AI",
    summary: "An AI assistant interface concept for practical business workflows.",
    description: "Nova AI connects conversational AI directly to structured JSON schema outputs for operational tools.",
    problem: "How can AI become a useful part of everyday business workflows rather than a separate tool?",
    solution: "A focused assistant interface connecting conversation with actionable workflow concepts.",
    results: "Concept demonstration — not a client project.",
    technologies: ["Next.js", "React", "TypeScript", "AI APIs"],
    featured: true,
    live_url: null,
    github_url: null,
    year: 2026,
    sort_order: 4,
    media: [
      {
        id: "981e14dd-2e66-4612-8b86-853cc8065f49",
        project_id: "eb9741fc-ffac-4110-8004-7ed37c512879",
        media_type: "image",
        title: "Hero preview",
        url: "https://placehold.co/1600x1000/png?text=Nova+AI+Assistant+%7C+Concept+Demo",
        thumbnail_url: "https://placehold.co/800x500/png?text=Nova+AI+Assistant+%7C+Concept+Demo",
        provider: null,
        alt_text: "Nova AI Assistant concept demo hero preview",
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
      const hero = projMedia.find((m) => m.sort_order === 1) || projMedia[0];
      const screenshots = projMedia.filter((m) => m.media_type === "screenshot" || m.id !== hero?.id);

      return {
        ...proj,
        media: projMedia,
        hero_media: hero,
        screenshots: screenshots,
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
