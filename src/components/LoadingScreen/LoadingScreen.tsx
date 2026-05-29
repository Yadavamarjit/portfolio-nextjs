"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"typing" | "done" | "exit">("typing");
  const [text, setText] = useState("");
  const full = "YA";

  useEffect(() => {
    // Type each character
    let i = 0;
    const typer = setInterval(() => {
      setText(full.slice(0, i + 1));
      i++;
      if (i >= full.length) {
        clearInterval(typer);
        setTimeout(() => setPhase("done"), 400);
        setTimeout(() => setPhase("exit"), 1100);
        setTimeout(() => onComplete(), 1700);
      }
    }, 220);
    return () => clearInterval(typer);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a192f]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Background rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#64ffda]/10"
              initial={{ width: 80 * i, height: 80 * i, opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              style={{ width: 80 * i, height: 80 * i }}
            />
          ))}

          <div className="relative flex flex-col items-center gap-6">
            {/* Monogram */}
            <motion.div
              className="relative"
              animate={phase === "done" ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="w-24 h-24 rounded-2xl border border-[#64ffda]/30 bg-[#64ffda]/5 flex items-center justify-center backdrop-blur-sm">
                <span className="text-4xl font-bold font-mono text-[#64ffda] tracking-widest">
                  {text}
                  <span className="animate-pulse text-[#64ffda]/60">
                    {text.length < full.length ? "|" : ""}
                  </span>
                </span>
              </div>
              {phase === "done" && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                  style={{ boxShadow: "0 0 40px rgba(100,255,218,0.4)" }}
                />
              )}
            </motion.div>

            {/* Loading bar */}
            <div className="w-32 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#64ffda,#8b5cf6)" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: phase === "done" ? 1 : 0.6 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            <p className="text-[#64ffda]/40 font-mono text-xs tracking-[0.3em] uppercase">
              Loading...
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
