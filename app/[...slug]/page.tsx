import Link from "next/link";

export default async function RoutePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const title = slug.at(-1)?.replace(/-/g, " ") ?? "Snow";
  return <main className="section-pad"><Link href="/" className="logo"><span className="logo-mark">✦</span> Snow</Link><div style={{ maxWidth: 720, paddingTop: 120 }}><p className="eyebrow">Snow / {slug.join(" / ")}</p><h1>{title.charAt(0).toUpperCase() + title.slice(1)}<br /><em>is taking shape.</em></h1><p className="hero-lede">This Snow foundation is ready for real content, Supabase-backed data and a tailored experience for this page.</p><Link href="/contact" className="button button-dark" style={{ marginTop: 24 }}>Start a project <span>↗</span></Link></div></main>;
}
