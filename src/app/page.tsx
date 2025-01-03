import { AIAssistantAnimation } from "@/components/AIIcon/AIIcon";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import StarsCanvas from "@/components/StarCanvas/StarCanvas";
import { AboutSection } from "@/sections/About";
import ContactSection from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";

export default function Home() {
  return (
    <>
      <div className="relative z-0">
        <Header />
        <HeroSection />
        <ProjectsSection />
        <TapeSection />
        <AboutSection />
        <ContactSection />
        {/* <Footer /> */}
        <StarsCanvas />
      </div>
      <div className="fixed bottom-10 z-50 right-10">
        <AIAssistantAnimation size={100} />
      </div>
      <SocialLinks />
    </>
  );
}
