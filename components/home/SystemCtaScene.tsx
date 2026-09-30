'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export const SystemCtaScene: React.FC = () => <section className="studio-cta"><div className="mx-auto max-w-5xl px-6 text-center md:px-12"><span className="section-kicker">Have a good one?</span><h2 className="studio-display mt-5">Let&apos;s make it <em>real.</em></h2><p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Bring the rough idea, the stuck system, or the next big move. We&apos;ll help turn it into something people can use.</p><Link href="/request" className="studio-button studio-button-dark mt-9">Work with Snow <ArrowUpRight size={17} /></Link></div></section>;
