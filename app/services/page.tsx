import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServicesStudio } from '@/components/services/ServicesStudio';
import { fetchServices } from '@/lib/services/fetchServices';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Services | Snow Digital Product Studio',
  description: 'Snow designs and builds websites, digital products, AI systems, mobile experiences, and resilient technical foundations.',
  path: '/services',
});

export default async function ServicesPage() {
  const services = await fetchServices();
  return <div className="min-h-screen"><Header /><main id="main-content"><ServicesStudio services={services} /></main><Footer /></div>;
}
