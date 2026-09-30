import { GlassNav } from "@/components/spatial/GlassNav";
import { Footer } from "@/components/layout/Footer";
import { SecurityMatrix } from "@/components/security/SecurityMatrix";

export function SecurityShell({ children }: { children: React.ReactNode }) {
  return <div className="security-page min-h-screen overflow-hidden bg-[#03090b] text-slate-100 selection:bg-emerald-300 selection:text-[#03100c]"><SecurityMatrix /><GlassNav activeHref="/security" />{children}<Footer /></div>;
}
