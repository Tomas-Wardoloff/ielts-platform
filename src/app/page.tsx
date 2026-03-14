import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/FooterSection";
import HeroSection from "@/components/home/HeroSection";
import ProcessSection from "@/components/home/ProcessSection";
import ModulesSection from "@/components/home/ModulesSection";
import FeaturesSection from "@/components/home/FeaturesSection";

export default function HomePage() {
  return (
    <div className="selection:bg-brand min-h-screen bg-[#fafafa] font-sans selection:text-white">
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <ModulesSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
