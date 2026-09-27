"use client";

import React from "react";
import { ServiceRecord, CapabilityFamilyId } from "@/lib/services/types";
import { CAPABILITY_FAMILIES } from "@/lib/services/capabilityFamilies";
import { CapabilityFamilyNav } from "@/components/services/CapabilityFamilyNav";
import { Layers, Globe, Smartphone, Cloud, ShieldCheck, Sparkles, HardDrive, Briefcase, ChartNoAxesCombined, Check } from "lucide-react";

interface ServiceStepProps {
  services: ServiceRecord[];
  selectedFamilyId: CapabilityFamilyId;
  selectedServiceSlug: string;
  onSelectFamily: (familyId: CapabilityFamilyId) => void;
  onSelectService: (service: ServiceRecord) => void;
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
};

export const ServiceStep: React.FC<ServiceStepProps> = ({
  services,
  selectedFamilyId,
  selectedServiceSlug,
  onSelectFamily,
  onSelectService,
}) => {
  const familyServices = services.filter((s) => s.capability_family === selectedFamilyId);
  const currentFamilyMeta = CAPABILITY_FAMILIES.find((f) => f.id === selectedFamilyId) || CAPABILITY_FAMILIES[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
          <Layers className="w-3.5 h-3.5" />
          <span>CAPABILITY CATALOG</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight">
          Select the service or capability required
        </h2>

        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          Filter by capability family or choose from our active service engineering disciplines below.
        </p>
      </div>

      {/* Capability Family Filter Tabs */}
      <CapabilityFamilyNav
        selectedFamilyId={selectedFamilyId}
        onSelectFamily={onSelectFamily}
      />

      {/* Services Grid */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Available Services in {currentFamilyMeta.name} ({familyServices.length})
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {familyServices.map((service) => {
            const isSelected = selectedServiceSlug === service.slug;
            const IconComp = (service.icon && iconMap[service.icon]) || Globe;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(service)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? "bg-slate-900 border-sky-500 shadow-lg shadow-sky-950/40 ring-1 ring-sky-500/30"
                    : "bg-slate-950/80 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                      isSelected
                        ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                        : "bg-slate-900 text-slate-400 border-slate-800 group-hover:text-slate-200"
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-100 font-sans group-hover:text-sky-300 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans line-clamp-2 mt-1 leading-relaxed">
                      {service.short_description}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
