"use client";

import { onBoardUser } from "@/utils/userLocation";
import { useEffect } from "react";

export const HeroSection = () => {
  useEffect(() => {
    onBoardUser();
  }, []);
  return (
    <div className="sec-container flex flex-col  relative">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-[#64ffda] mb-4 sm-text tracking-widest font-mono">
          Hi, my name is
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4">
          Yadav Amarjit.
        </h1>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#8892b0] mb-6 sm:mb-8">
          I build what you envision
        </h1>
        <BackgroundGlow />
        <div className="relative max-w-xl lg:max-w-2xl">
          <p className="text-secondary sm-text leading-relaxed duration-300">
            <span className="text-[#64ffda] font-semibold">Code Alchemist</span>{" "}
            and{" "}
            <span className="text-[#64ffda] font-semibold">
              Full-Stack Sorcerer
            </span>{" "}
            turning ideas into digital magic with{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              React
            </span>
            ,{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              Next.js
            </span>
            ,{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              Node.js
            </span>
            ,{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              MongoDB
            </span>
            , and{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              LLM
            </span>
            . From sleek UIs to smart chatbots, I craft cutting-edge solutions
            and bring bold tech visions to life.
          </p>

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <button className="w-full sm:w-auto group/btn flex items-center justify-center gap-2 px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors duration-300 sm-text">
              Let&apos;s create something extraordinary!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BackgroundGlow = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {/* Main background color */}
      <div className="absolute inset-0 bg-[#0a192f]" />

      {/* Primary glow source - top right */}
      <div
        className="absolute top-[15%] left-0 w-[70%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(72 189 160 / 20%) 0%, rgb(100 255 218 / 8%) 45%, rgb(100 255 218 / 0%) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary glow source - center left */}
      {/* <div
        className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(100,255,218,0.05) 0%, rgba(100,255,218,0.02) 45%, rgba(100,255,218,0) 70%)",
          filter: "blur(45px)",
        }}
      /> */}

      {/* Accent glow - bottom */}
      {/* <div
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(100,255,218,0.06) 0%, rgba(100,255,218,0.02) 45%, rgba(100,255,218,0) 70%)",
          filter: "blur(50px)",
        }}
      /> */}

      {/* Subtle overlay for depth */}
      {/* <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, rgba(10,25,47,0.2) 100%)",
        }}
      /> */}
    </div>
  );
};
