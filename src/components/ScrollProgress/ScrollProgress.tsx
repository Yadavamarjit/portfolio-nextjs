"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-white/5">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress / 100,
          background: "linear-gradient(90deg, #64ffda, #8b5cf6, #64ffda)",
          boxShadow: "0 0 8px rgba(100,255,218,0.6)",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
