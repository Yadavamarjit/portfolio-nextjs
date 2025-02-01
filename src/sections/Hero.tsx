"use client";

import { motion } from "framer-motion";
import { onBoardUser } from "@/utils/userLocation";
import { useEffect } from "react";
import { BackgroundGlow } from "@/components/BackgroutGlow/BackgroutGlow";

export const HeroSection = () => {
  useEffect(() => {
    onBoardUser();
  }, []);

  // Animation variants for text and button
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.4 },
    },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <div className="sec-container flex flex-col relative" id="home">
      <div className="max-w-7xl mx-auto w-full mt-20 lg:mt-0">
        {/* Animated text */}
        <motion.p
          className="text-[#64ffda] mb-4 sm-text tracking-widest font-mono"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Yadav Amarjit.
        </motion.h1>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#8892b0] mb-6 sm:mb-8"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          I build what you envision
        </motion.h1>

        <BackgroundGlow />

        <div className="relative max-w-xl lg:max-w-2xl">
          <motion.p
            className="text-secondary sm-text leading-relaxed duration-300"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
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
          </motion.p>

          {/* Animated button */}
          <motion.div
            className="mt-8 sm:mt-10 lg:mt-12"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <a href="#contact">
              <button className="w-full sm:w-auto group/btn flex items-center justify-center gap-2 px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors duration-300 sm-text">
                Let&apos;s create something extraordinary!
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
