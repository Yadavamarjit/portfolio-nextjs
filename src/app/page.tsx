"use client";
import { AIAssistantAnimation } from "@/components/AIIcon/AIIcon";
import { MsgSheet } from "@/components/MsgSheet/MsgSheet";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { MessageProvider } from "@/context/MessageContext";
import { AboutSection } from "@/sections/About";
import ContactSection from "@/sections/Contact";
import Experiences from "@/sections/Experiences";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const CustomCursor = dynamic(() => import("@/components/CustomCursor/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress/ScrollProgress"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen/LoadingScreen"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <MessageProvider>
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-0">
          <Header />
          <HeroSection />

          {/* Section transition: Hero → Experiences */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#64ffda]/20 to-transparent mx-8 lg:mx-24" />

          <Experiences />

          {/* Section transition: Experiences → Projects */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#64ffda]/15 to-transparent mx-8 lg:mx-24" />

          <ProjectsSection />
          <TapeSection />
          <AboutSection />
          <ContactSection />
          <Footer />
        </div>
        <div className="fixed bottom-20 right-4 md:bottom-10 md:right-10 z-50">
          <AIAssistantAnimation size={100} />
        </div>
        <SocialLinks />
        <MsgSheet />
      </motion.div>
    </MessageProvider>
  );
}
