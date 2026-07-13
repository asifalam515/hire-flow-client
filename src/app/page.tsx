import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/shared/HeroSection";
import { PopularCategory } from "@/components/shared/PopularCategory";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFF5FF] dark:bg-slate-950 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Top Floating Navbar */}
      <Navbar />

      {/* Main Hero & Sections Content */}
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection />
        <PopularCategory />
      </main>
    </div>
  );
}
