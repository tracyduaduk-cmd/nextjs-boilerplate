"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, MoveUpRight, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { STATIC_PROJECTS } from "@/lib/projects/queries";
import { CAPABILITY_FAMILIES } from "@/lib/services/capabilityFamilies";
import { FALLBACK_SERVICES, fetchServices } from "@/lib/services/fetchServices";
import type { ServiceRecord } from "@/lib/services/types";
import { getPublicUrl } from "@/lib/projects/mediaManifest";
import { KineticLine, PointerField, SceneMarker, useSceneProgress } from "@/components/spatial/InteractionPrimitives";

const capabilityNotes: Record<string, string> = {
  WEB: "Interfaces with a pulse. Commerce, platforms, and public-facing systems engineered as one continuous surface.",
  "APPS & SOFTWARE": "Operational logic made legible. Tools that make complex work feel direct, calm, and fast.",
  AI: "Useful intelligence, not theatre. Agents and workflows that remove friction from real operations.",
  "SECURITY & RECOVERY": "Resilience as a design material. Recovery paths, audits, and hardening for systems that matter.",
  INFRASTRUCTURE: "The invisible layer made dependable. Deployment, hosting, domains, APIs, and data foundations.",
  "DIGITAL GROWTH": "Signal over noise. Technical foundations and instrumentation that make growth observable.",
  "BUSINESS IT": "A better working environment. Managed systems, devices, and support that stay out of the way.",
  "DEVICES & HARDWARE": "The physical edge of the stack. Practical upgrades, repairs, and reliable workstations.",
};

export function SnowHomeExperience() {
  const progress = useSceneProgress();
  const [activeCapability, setActiveCapability] = useState(CAPABILITY_FAMILIES[0].id);
  const [services, setServices] = useState<ServiceRecord[]>(FALLBACK_SERVICES);
  const [activeServiceSlug, setActiveServiceSlug] = useState(FALLBACK_SERVICES[0]?.slug ?? "");
  const [activeProject, setActiveProject] = useState(0);
  const selectedCapability = CAPABILITY_FAMILIES.find((item) => item.id === activeCapability) ?? CAPABILITY_FAMILIES[0];
  const capabilityServices = services.filter((service) => service.capability_family === activeCapability);
  const selectedService = capabilityServices.find((service) => service.slug === activeServiceSlug) ?? capabilityServices[0];
  const project = STATIC_PROJECTS[activeProject];
  const projectImage = getPublicUrl(project.slug, "desktop.webp");
  const orbit = useMemo(() => ({ x: `${(progress * 120 - 30).toFixed(1)}%`, y: `${(progress * -80 + 40).toFixed(1)}%` }), [progress]);

  useEffect(() => {
    fetchServices().then((records) => {
      if (records.length) setServices(records);
    });
  }, []);

  return (
    <main id="main-content" className="snow-home">
      <section className="scene scene-intro" aria-labelledby="intro-title">
        <div className="scene-noise" aria-hidden="true" />
        <SceneMarker index="01" label="Snow / interactive studio" />
        <div className="intro-grid">
          <div className="intro-copy">
            <p className="eyebrow">Technology, directed in motion</p>
            <h1 id="intro-title" className="display-title display-title-xl">
              <KineticLine>Build</KineticLine>
              <KineticLine>digital</KineticLine>
              <KineticLine tone="light">experiences</KineticLine>
              <KineticLine>that move.</KineticLine>
            </h1>
            <p className="intro-deck">Snow is an independent technology studio for brands and teams who need the interface, the system, and the thinking behind it to feel like one thing.</p>
            <div className="intro-actions">
              <Link className="magnetic-link magnetic-link-solid" href="/request">Start a project <ArrowUpRight size={16} /></Link>
              <a className="text-link" href="#capabilities">Enter the field <ArrowDownRight size={16} /></a>
            </div>
          </div>
          <PointerField className="intro-field" aria-hidden="true">
            <div className="field-radial" />
            <div className="field-orbit field-orbit-one" style={{ transform: `translate3d(${orbit.x}, ${orbit.y}, 0) rotateX(68deg) rotateZ(-12deg)` }} />
            <div className="field-orbit field-orbit-two" style={{ transform: `translate3d(${orbit.y}, ${orbit.x}, 0) rotateX(68deg) rotateZ(40deg)` }} />
            <div className="field-core"><span>SNOW</span><small>FIELD / 001</small></div>
            <div className="field-coordinates">40°42′46″ N<br />74°00′21″ W</div>
            <div className="field-label field-label-a">/ pointer input</div>
            <div className="field-label field-label-b">/ spatial layer</div>
          </PointerField>
        </div>
        <div className="intro-foot"><span>Scroll to explore</span><span className="scroll-line" /><span>Build / move / repeat</span></div>
      </section>

      <section className="scene scene-statement" aria-labelledby="statement-title">
        <SceneMarker index="02" label="A system with a point of view" invert />
        <div className="statement-layout">
          <p className="section-kicker">The work is not decoration</p>
          <h2 id="statement-title" className="display-title display-title-lg">We make the <em>behavior</em> part of the brand.</h2>
          <div className="statement-aside"><span className="aside-index">02—04</span><p>Scroll changes scale. Pointer creates depth. Type becomes navigation. The interface carries the argument.</p></div>
        </div>
        <div className="statement-marquee" aria-hidden="true"><span>INTERFACE / SYSTEM / MOTION / INTERFACE / SYSTEM / MOTION / </span></div>
      </section>

      <section id="capabilities" className="scene scene-capabilities" aria-labelledby="capabilities-title">
        <SceneMarker index="03" label="Capability field" />
        <div className="section-heading-row"><div><p className="eyebrow">Choose a vector</p><h2 id="capabilities-title" className="display-title display-title-md">Find the layer<br /><em>that needs motion.</em></h2></div><p className="section-intro">Eight capability families. One connected system. Select a point in the field to change the atmosphere.</p></div>
        <div className="capability-layout">
          <div className="capability-wheel" role="list" aria-label="Snow capability families">
            <div className="wheel-cross" aria-hidden="true" />
            {CAPABILITY_FAMILIES.map((family, index) => {
              const isActive = family.id === activeCapability;
              return <button key={family.id} type="button" aria-pressed={isActive} className={`capability-node node-${index} ${isActive ? "is-active" : ""}`} onClick={() => { setActiveCapability(family.id); setActiveServiceSlug(""); }}><span className="node-number">0{index + 1}</span><span>{family.name.replace(/ &.*/, "")}</span><i /></button>;
            })}
            <div className="wheel-center"><span>{selectedCapability.badge}</span><strong>{selectedCapability.id}</strong><small>SELECTED VECTOR</small></div>
          </div>
          <div className="capability-detail" aria-live="polite"><p className="eyebrow">{selectedCapability.badge}</p><h3>{selectedCapability.name}</h3><p>{selectedService?.short_description ?? capabilityNotes[selectedCapability.id] ?? selectedCapability.description}</p><div className="service-orbit-list" aria-label={`${selectedCapability.name} services`}>{capabilityServices.slice(0, 5).map((service) => <button key={service.slug} type="button" className={selectedService?.slug === service.slug ? "is-active" : ""} onClick={() => setActiveServiceSlug(service.slug)}>{service.name}<ArrowUpRight size={13} /></button>)}</div><Link className="text-link" href={`/request?service=${encodeURIComponent(selectedService?.slug ?? selectedCapability.id)}`}>Open this vector <ArrowUpRight size={16} /></Link><div className="detail-meta"><span>01 / 08</span><span>Pointer-reactive system</span></div></div>
        </div>
      </section>

      <section className="scene scene-work" aria-labelledby="work-title">
        <SceneMarker index="04" label="Selected work" invert />
        <div className="section-heading-row work-heading"><div><p className="section-kicker">Proof through behavior</p><h2 id="work-title" className="display-title display-title-md">Work that<br /><em>holds attention.</em></h2></div><Link className="text-link text-link-light" href="/work">See the full archive <ArrowUpRight size={16} /></Link></div>
        <div className="work-stage">
          <div className="work-image-wrap"><Image src={projectImage} alt={project.media[1]?.alt_text ?? `${project.title} interface`} fill unoptimized className="work-image" priority={activeProject === 0} /><div className="work-image-index">0{activeProject + 1} / 0{Math.min(STATIC_PROJECTS.length, 8)}</div></div>
          <div className="work-caption"><p className="eyebrow">{project.category} / {project.year}</p><h3>{project.title}</h3><p>{project.summary}</p><Link className="magnetic-link magnetic-link-outline" href={`/work/${project.slug}`}>View study <MoveUpRight size={16} /></Link></div>
        </div>
        <div className="project-rail" aria-label="Select a project">
          {STATIC_PROJECTS.slice(0, 6).map((item, index) => <button type="button" key={item.slug} className={index === activeProject ? "is-active" : ""} onClick={() => setActiveProject(index)}><span>0{index + 1}</span><strong>{item.title}</strong><Plus size={15} /></button>)}
        </div>
      </section>

      <section className="scene scene-care" aria-labelledby="care-title"><SceneMarker index="05" label="Snow care" /><div className="care-layout"><div><p className="eyebrow">Keep the system alive</p><h2 id="care-title" className="display-title display-title-md">Build it once.<br /><em>Keep it moving.</em></h2></div><div className="care-copy"><p>Snow Care is the ongoing layer for teams who want their digital infrastructure reviewed, improved, and ready for the next change.</p><Link className="magnetic-link magnetic-link-solid" href="/care">Explore Snow Care <ArrowUpRight size={16} /></Link></div></div></section>

      <section className="scene scene-cta" aria-labelledby="cta-title"><div className="cta-index">06 / START</div><h2 id="cta-title" className="display-title display-title-cta">Ready to make<br /><em>something move?</em></h2><Link className="cta-circle" href="/request" aria-label="Start a project"><span>Start<br />here</span><ArrowUpRight size={24} /></Link><div className="cta-footer"><span>Snow Technology Studio</span><span>Web / Apps / AI / Systems</span><span>© {new Date().getFullYear()}</span></div></section>
    </main>
  );
}
