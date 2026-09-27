import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SnowHomeExperience } from "@/components/home/SnowHomeExperience";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <SnowHomeExperience />
      <Footer />
    </div>
  );
}
