"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  ["BUILD", "Websites, apps and digital products", "01"],
  ["FIX", "Broken systems, bugs and slow experiences", "02"],
  ["AI", "Tools, agents and intelligent workflows", "03"],
  ["CONNECT", "APIs, payments and third-party systems", "04"],
  ["PROTECT", "Hardening, backups and recovery guidance", "05"],
  ["GROW", "SEO, performance and digital improvement", "06"],
];

const problems = ["My website is broken.", "I need a website.", "I need an app.", "I want AI in my business.", "My website is too slow.", "I need my systems connected."];
const demos = ["Operations dashboard", "Ecommerce interface", "AI support desk", "Booking system"];
const technologies = ["Next.js", "React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Vercel", "REST APIs", "Webhooks"];

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [activeDemo, setActiveDemo] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      <header className="site-header">
        <Link href="/" className="logo" aria-label="Snow home"><span className="logo-mark">✦</span> Snow</Link>
        <nav className="nav-links" aria-label="Main navigation"><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/faq">FAQ</Link></nav>
        <Link href="/contact" className="header-cta">Start a project <span>↗</span></Link>
      </header>

      <section className="hero section-pad">
        <div className="hero-copy"><p className="eyebrow">Technology made clearer.</p><h1>Technology problems?<br /><em>Let&apos;s build the solution.</em></h1><p className="hero-lede">Snow builds, fixes, improves and automates the websites, apps and digital systems that move your work forward.</p><div className="hero-actions"><Link href="/contact" className="button button-dark">Start a project <span>↗</span></Link><Link href="/work" className="text-link">Explore our work <span>→</span></Link></div></div>
        <div className="hero-visual" aria-label="Interactive system visualization"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-core"><span>✦</span><small>SNOW / SYSTEMS</small></div><div className="signal signal-a">BUILD <b>↗</b></div><div className="signal signal-b">AI <b>↗</b></div><div className="signal signal-c">GROW <b>↗</b></div></div>
      </section>

      <section className="ticker"><div>BUILD <span>✦</span> FIX <span>✦</span> CONNECT <span>✦</span> PROTECT <span>✦</span> GROW <span>✦</span> BUILD <span>✦</span> FIX</div></section>

      <section className="section-pad dark-section"><div className="section-intro"><p className="eyebrow light">What Snow does</p><h2>From first idea<br />to <em>better system.</em></h2><p>One capable partner for the parts of technology that are exciting, frustrating or still unclear.</p></div><div className="service-grid">{services.map(([title, desc, number], index) => <Link href={`/services/${title.toLowerCase()}`} key={title} className={`service-card ${activeService === index ? "active" : ""}`} onMouseEnter={() => setActiveService(index)}><span className="service-number">{number}</span><h3>{title}</h3><p>{desc}</p><span className="service-arrow">↗</span></Link>)}</div></section>

      <section className="section-pad problems"><div className="section-intro split"><div><p className="eyebrow">Start with the problem</p><h2>Tell us what&apos;s<br /><em>not working.</em></h2></div><p>Good technology starts with a clear understanding of the friction. Choose a place to begin.</p></div><div className="problem-grid">{problems.map((problem, index) => <Link href="/contact" key={problem} className="problem-row"><span>0{index + 1}</span><strong>{problem}</strong><b>↗</b></Link>)}</div></section>

      <section className="section-pad demo-section"><div className="section-intro split"><div><p className="eyebrow light">Interactive demos</p><h2>See the thinking<br /><em>in motion.</em></h2></div><p>Concept interfaces built to show how a product can feel when the complexity is handled well.</p></div><div className="demo-layout"><div className="demo-tabs">{demos.map((demo, index) => <button className={activeDemo === index ? "selected" : ""} onClick={() => setActiveDemo(index)} key={demo}><span>0{index + 1}</span>{demo}<b>↗</b></button>)}</div><div className="demo-frame"><div className="demo-top"><span className="window-dots">● ● ●</span><span>snow / {demos[activeDemo].toLowerCase()}</span><span>•••</span></div><div className="demo-content"><div className="demo-sidebar"><strong>Snow.</strong><span>Overview</span><span>Projects</span><span>Insights</span><span>Settings</span></div><div className="demo-main"><p className="eyebrow">Good morning, Alex</p><h3>{activeDemo === 0 ? "Your systems, at a glance." : activeDemo === 1 ? "A calmer way to shop." : activeDemo === 2 ? "Support that keeps up." : "Bookings without the back-and-forth."}</h3><div className="metric-row"><div><small>Active projects</small><strong>24</strong></div><div><small>System health</small><strong>98.4%</strong></div><div><small>Tasks cleared</small><strong>184</strong></div></div><div className="chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></div></div></div><span className="concept-label">Concept Demo — not client work</span></section>

      <section className="section-pad work-section"><div className="section-intro split"><div><p className="eyebrow">Selected concepts</p><h2>Useful, not<br /><em>just beautiful.</em></h2></div><Link href="/work" className="text-link">View all concepts <span>→</span></Link></div><div className="work-grid"><article className="work-card warm"><span>CONCEPT DEMO / 01</span><div><h3>Northstar</h3><p>Operations dashboard for seeing the whole system.</p></div></article><article className="work-card blue"><span>CONCEPT DEMO / 02</span><div><h3>Fieldnotes</h3><p>A calmer workspace for distributed teams.</p></div></article></div></section>

      <section className="section-pad process-section"><div className="section-intro"><p className="eyebrow">A clear process</p><h2>Make progress<br /><em>visible.</em></h2></div><div className="process-line">{["DISCOVER", "PLAN", "DESIGN", "BUILD", "TEST", "LAUNCH", "IMPROVE"].map((step, i) => <div key={step}><span>0{i + 1}</span><strong>{step}</strong></div>)}</div></section>

      <section className="section-pad tech-section"><div><p className="eyebrow">Tools we work with</p><h2>Right tool.<br /><em>Right reason.</em></h2></div><div className="tech-cloud">{technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></section>

      <section className="section-pad faq-section"><div className="section-intro split"><div><p className="eyebrow">Frequently asked</p><h2>Clear answers<br /><em>first.</em></h2></div><Link href="/faq" className="text-link">See all FAQs <span>→</span></Link></div><div className="faq-list">{["What kind of projects does Snow take on?", "Can Snow fix an existing website or app?", "Do you work with teams that already have developers?", "How do we get started?"] .map((question, index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>{openFaq === index && <p>Snow works across websites, web apps, mobile products and connected systems. We start with the problem, make the next step clear, and build from there.</p>}</div>)}</div></section>

      <section className="contact-band"><p className="eyebrow light">Have a problem to solve?</p><h2>Let&apos;s make technology<br /><em>feel simpler.</em></h2><Link href="/contact" className="button button-light">Start a project <span>↗</span></Link></section>
      <footer className="footer"><Link href="/" className="logo"><span className="logo-mark">✦</span> Snow</Link><p>Technology made clearer.</p><div><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/contact">Contact</Link></div><small>© 2026 Snow. Built for better systems.</small></footer>
    </main>
  );
}
