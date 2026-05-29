"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { onBoardUser } from "@/utils/userLocation";
import { useEffect, useState, useRef } from "react";
import { BackgroundGlow } from "@/components/BackgroutGlow/BackgroutGlow";
import dynamic from "next/dynamic";

const HeroBackground = dynamic(
  () => import("@/components/HeroBackground/HeroBackground"),
  { ssr: false }
);

const PHRASES = [
  "I build what you envision",
  "I ship production code",
  "I turn ideas into products",
  "I craft digital experiences",
];

const useTypewriter = (phrases: string[], speed = 60, pause = 1800) => {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setPhraseIdx((p) => (p + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return display;
};

// Magnetic button — disabled on mobile (touch detection)
const MagneticButton = ({
  children,
  className,
  href,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  id?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) return <a href={href} id={id}>{inner}</a>;
  return <div id={id}>{inner}</div>;
};

export const HeroSection = () => {
  useEffect(() => { onBoardUser(); }, []);
  const typewriter = useTypewriter(PHRASES);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="sec-container flex flex-col relative min-h-screen pb-24 lg:pb-32 !px-5 sm:!px-8 md:!px-16 lg:!px-24"
      id="home"
    >
      <HeroBackground />
      <BackgroundGlow />

      <div className="max-w-7xl mx-auto w-full mt-16 sm:mt-20 lg:mt-0 relative z-10">
        {/* Status badge */}
        <motion.div className="mb-4 sm:mb-6" variants={badgeVariants} initial="hidden" animate="visible">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-full text-[10px] sm:text-xs font-mono tracking-widest border border-[#64ffda]/30 text-[#64ffda]/80 bg-[#64ffda]/5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#64ffda] animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        <motion.p
          className="text-[#64ffda] mb-3 sm:mb-4 text-sm sm:text-base tracking-widest font-mono"
          variants={textVariants} initial="hidden" animate="visible"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-1 sm:mb-2 leading-tight"
          variants={textVariants} initial="hidden" animate="visible"
          transition={{ delay: 0.15 }}
        >
          Yadav Amarjit.
        </motion.h1>

        {/* Typewriter heading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#8892b0] mb-5 sm:mb-8 min-h-[1.3em] leading-tight"
          variants={textVariants} initial="hidden" animate="visible"
          transition={{ delay: 0.3 }}
        >
          {typewriter}
          <span className="inline-block w-[2px] sm:w-[3px] h-[0.75em] ml-1 bg-[#64ffda] align-middle animate-pulse" />
        </motion.h2>

        {/* Description */}
        <div className="relative max-w-xl lg:max-w-2xl">
          <motion.p
            className="text-secondary text-sm sm:text-base leading-relaxed"
            variants={textVariants} initial="hidden" animate="visible"
            transition={{ delay: 0.45 }}
          >
            <span className="text-[#64ffda] font-semibold">Code Alchemist</span>{" "}and{" "}
            <span className="text-[#64ffda] font-semibold">Full-Stack Sorcerer</span>{" "}
            turning ideas into digital magic with React, Next.js, Node.js, MongoDB & LLM.
            From sleek UIs to smart chatbots, I craft cutting-edge solutions and bring bold tech visions to life.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Mobile: plain buttons, desktop: magnetic */}
            <a
              href="#contact"
              id="hero-contact-btn"
              className="flex items-center justify-center px-6 py-3.5 sm:py-3 border border-[#64ffda] text-[#64ffda] rounded text-sm sm:text-base hover:bg-[#64ffda]/10 transition-all duration-300 active:scale-95 hover:shadow-[0_0_20px_rgba(100,255,218,0.2)] font-medium"
            >
              Let&apos;s create something extraordinary!
            </a>
            <a
              href="#projects"
              id="hero-projects-btn"
              className="flex items-center justify-center px-6 py-3.5 sm:py-3 text-secondary rounded border border-secondary/30 hover:border-[#64ffda]/40 hover:text-[#64ffda] transition-all duration-300 text-sm sm:text-base active:scale-95"
            >
              View my work ↓
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator — desktop only */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-secondary/50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="text-xs font-mono tracking-widest">scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#64ffda]/40 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};
