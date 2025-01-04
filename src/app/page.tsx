import { AIAssistantAnimation } from "@/components/AIIcon/AIIcon";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import StarsCanvas from "@/components/StarCanvas/StarCanvas";
import { AboutSection } from "@/sections/About";
import ContactSection from "@/sections/Contact";
import Experiences from "@/sections/Experiences";
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
        <Experiences />
        <ProjectsSection />
        <TapeSection />
        <AboutSection />
        <ContactSection />
        {/* <Footer /> */}
        <StarsCanvas />
      </div>
      <div className="fixed lg:bottom-10 z-50 lg:right-10 bottom-5 right-6">
        <AIAssistantAnimation size={100} />
      </div>
      <SocialLinks />
    </>
  );
}
