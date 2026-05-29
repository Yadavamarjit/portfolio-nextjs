"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionTitle({ title }: { title: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const words = title.split(" ");

  return (
    <div ref={ref} className="flex items-center gap-2 sm:gap-4 overflow-hidden">
      {/* Left line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent to-[#64ffda]/60 flex-1 min-w-[20px]"
        initial={{ scaleX: 0, originX: 1 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Title */}
      <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-secondary backdrop-blur py-2 rounded flex gap-1 sm:gap-2 flex-wrap justify-center shrink-0">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-nowrap"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.09, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Right line */}
      <motion.div
        className="h-px bg-gradient-to-l from-transparent to-[#64ffda]/60 flex-1 min-w-[20px]"
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
    </div>
  );
}
