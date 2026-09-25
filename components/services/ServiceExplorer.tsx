"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/spatial/Reveal";
import { SplitText } from "@/components/spatial/SplitText";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { PointerGlow } from "@/components/spatial/PointerGlow";
import { CapabilityFamilyNav } from "./CapabilityFamilyNav";
import { ActiveServiceDisplay } from "./ActiveServiceDisplay";
import { ProblemDiagnostic } from "./ProblemDiagnostic";
import { ServiceRecord, CapabilityFamilyId, ProblemOption } from "@/lib/services/types";
import { CAPABILITY_FAMILIES } from "@/lib/services/capabilityFamilies";
import { fetchServices, FALLBACK_SERVICES } from "@/lib/services/fetchServices";
import {
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Sparkles,
  HardDrive,
  Briefcase,
  ChartNoAxesCombined,
  Wrench,
  LockKeyhole,
  PenTool,
  ArrowRight,
} from "lucide-react";

interface ServiceExplorerProps {
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Sparkles,
  HardDrive,
  Briefcase,
  ChartNoAxesCombined,
  Wrench,
  LockKeyhole,
  PenTool,
};

export const ServiceExplorer: React.FC<ServiceExplorerProps> = ({
  className = "",
}) => {
  const router = useRouter();
  const [services, setServices] = useState<ServiceRecord[]>(FALLBACK_SERVICES);
  const [selectedFamilyId, setSelectedFamilyId] = useState<CapabilityFamilyId>("WEB");
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>("web-development");
  const [activeDiagnosticOptionId, setActiveDiagnosticOptionId] = useState<string | null>(null);

  const explorerRef = useRef<HTMLElement>(null);

  // Fetch services from Supabase on mount
  useEffect(() => {
    async function loadData() {
      const data = await fetchServices();
      if (data && data.length > 0) {
        setServices(data);
      }
    }
    loadData();
  }, []);

  // Filter services by active capability family
  const familyServices = useMemo(() => {
    return services.filter((s) => s.capability_family === selectedFamilyId);
  }, [services, selectedFamilyId]);

  // Active family metadata
  const currentFamilyMeta = useMemo(() => {
    return (
      CAPABILITY_FAMILIES.find((f) => f.id === selectedFamilyId) ||
      CAPABILITY_FAMILIES[0]
    );
  }, [selectedFamilyId]);

  // Active service record
  const currentActiveService = useMemo(() => {
    const found = familyServices.find((s) => s.slug === activeServiceSlug);
    if (found) return found;
    return familyServices[0] || services[0];
  }, [familyServices, activeServiceSlug, services]);

  // Handle family change
  const handleSelectFamily = (familyId: CapabilityFamilyId) => {
    setSelectedFamilyId(familyId);
    const matching = services.filter((s) => s.capability_family === familyId);
    if (matching.length > 0) {
      setActiveServiceSlug(matching[0].slug);
    }
  };

  // Handle problem diagnostic selection
  const handleDiagnosticSelect = (option: ProblemOption) => {
    setActiveDiagnosticOptionId(option.id);
    if (option.id === "not-sure") {
      router.push("/request?mode=diagnostic");
      return;
    }

    setSelectedFamilyId(option.capabilityFamily);
    if (option.recommendedSlug) {
      setActiveServiceSlug(option.recommendedSlug);
    }

    // Smooth scroll down to explorer stage
    if (explorerRef.current) {
      explorerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle request CTA -> navigate to /request?service=slug
  const handleRequestService = (service: ServiceRecord) => {
    router.push(`/request?service=${encodeURIComponent(service.slug)}`);
  };

  return (
    <div className={`w-full bg-slate-950 text-slate-100 ${className}`}>
      {/* 1. Problem Diagnostic Entry Point */}
      <ProblemDiagnostic
        onSelectOption={handleDiagnosticSelect}
        activeOptionId={activeDiagnosticOptionId}
      />

      {/* 2. Main Services / Capabilities Explorer */}
      <section
        ref={explorerRef}
        id="services"
        className="relative py-20 sm:py-28 bg-[#07090e] border-b border-slate-900 overflow-hidden"
      >
        <PointerGlow color="rgba(56, 189, 248, 0.1)" size={600} />

        {/* Ambient Grid Background */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10 w-full">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400 font-medium">
                <span>CAPABILITY EXPLORER</span>
                <span className="text-slate-700">•</span>
                <span className="text-slate-300">SPATIAL SERVICE SYSTEM</span>
              </div>
            </Reveal>

            <SplitText
              text="Explore Technology Capabilities"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight font-sans"
              delay={0.15}
            />

            <Reveal direction="up" delay={0.25}>
              <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
                Snow is organized across 8 major capability families. Explore our service universe below, review engineering details, or request direct technical support.
              </p>
            </Reveal>
          </div>

          {/* Capability Family Tab Selector */}
          <div className="mb-10">
            <CapabilityFamilyNav
              selectedFamilyId={selectedFamilyId}
              onSelectFamily={handleSelectFamily}
            />
          </div>

          {/* Spatial 3D Composition Area */}
          <PerspectiveContainer perspective={1400} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: List of Services in Selected Family */}
              <div className="lg:col-span-4 space-y-3">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md mb-4">
                  <h3 className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                    {"// "}{currentFamilyMeta.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    {currentFamilyMeta.description}
                  </p>
                </div>

                <div className="space-y-2.5" role="tablist" aria-label="Services List">
                  {familyServices.map((service) => {
                    const isActive = currentActiveService?.slug === service.slug;
                    const IconComp = (service.icon && iconMap[service.icon]) || Globe;

                    return (
                      <button
                        key={service.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveServiceSlug(service.slug)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                          isActive
                            ? "bg-slate-900 border-sky-500/60 shadow-lg shadow-sky-950/40"
                            : "bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700/80"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 pr-2">
                          <div
                            className={`p-2.5 rounded-xl border transition-colors ${
                              isActive
                                ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                                : "bg-slate-900 text-slate-400 border-slate-800 group-hover:text-slate-200"
                            }`}
                          >
                            <IconComp className="w-4 h-4" />
                          </div>

                          <div>
                            <div className="text-sm font-bold font-sans text-slate-200 group-hover:text-sky-300 transition-colors">
                              {service.name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500">
                              {service.category}
                            </div>
                          </div>
                        </div>

                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isActive
                              ? "text-sky-400 translate-x-1"
                              : "text-slate-600 group-hover:text-slate-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Spatial Stage for Active Service Details */}
              <div className="lg:col-span-8">
                {currentActiveService ? (
                  <ActiveServiceDisplay
                    service={currentActiveService}
                    familyMeta={currentFamilyMeta}
                    onRequestService={handleRequestService}
                  />
                ) : (
                  <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center text-slate-500 font-mono text-xs">
                    Select a service to view details.
                  </div>
                )}
              </div>

            </div>
          </PerspectiveContainer>
        </Container>
      </section>
    </div>
  );
};
