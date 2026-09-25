"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Check,
  X,
  Send,
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
  const [services, setServices] = useState<ServiceRecord[]>(FALLBACK_SERVICES);
  const [selectedFamilyId, setSelectedFamilyId] = useState<CapabilityFamilyId>("WEB");
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>("web-development");
  const [activeDiagnosticOptionId, setActiveDiagnosticOptionId] = useState<string | null>(null);
  const [requestModalService, setRequestModalService] = useState<ServiceRecord | null>(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

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
    setSelectedFamilyId(option.capabilityFamily);
    if (option.recommendedSlug) {
      setActiveServiceSlug(option.recommendedSlug);
    }

    // Smooth scroll down to explorer stage
    if (explorerRef.current) {
      explorerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle request CTA
  const handleRequestService = (service: ServiceRecord) => {
    setRequestModalService(service);
    setRequestSubmitted(false);
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

      {/* 3. Request Service Modal Context */}
      <AnimatePresence>
        {requestModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100"
            >
              <button
                type="button"
                onClick={() => setRequestModalService(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!requestSubmitted ? (
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider mb-1">
                      SERVICE REQUEST
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-100">
                      {requestModalService.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-1">
                      {requestModalService.short_description}
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRequestSubmitted(true);
                    }}
                    className="space-y-4 text-xs font-sans"
                  >
                    <div>
                      <label className="block text-slate-300 font-mono text-[11px] mb-1">
                        YOUR NAME / ORGANIZATION
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe or Acme Corp"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-mono text-[11px] mb-1">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-mono text-[11px] mb-1">
                        BRIEF DESCRIPTION OF YOUR TECHNICAL NEED
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder={`Tell us about your requirements for ${requestModalService.name}...`}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setRequestModalService(null)}
                        className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 font-mono text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold font-mono text-xs flex items-center gap-2 shadow-lg shadow-sky-950/50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Request</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-sans text-slate-100">
                    Request Received
                  </h3>
                  <p className="text-xs text-slate-400 font-sans max-w-xs mx-auto">
                    Thank you for reaching out regarding <span className="text-sky-300">{requestModalService.name}</span>. Our engineering team will review your requirements and follow up promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRequestModalService(null)}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
