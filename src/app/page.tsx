import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/shared/HeroSection";
import { BentoFeatures } from "@/components/shared/BentoFeatures";
import { NewestJobs } from "@/components/shared/NewestJobs";
import { TopCompanies } from "@/components/shared/TopCompanies";
import { EmployerCta } from "@/components/shared/EmployerCta";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col linear-canvas text-[#f7f8f8] font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Top Floating Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <BentoFeatures />
        <NewestJobs />
        <TopCompanies />
        <EmployerCta />
      </main>

      {/* Developer-Grade Status Footer */}
      <Footer />
    </div>
  );
}
