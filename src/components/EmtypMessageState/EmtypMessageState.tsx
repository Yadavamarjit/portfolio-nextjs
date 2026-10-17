"use client";
import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useMessages } from "@/context/MessageContext";
import { motion, AnimatePresence } from "framer-motion";

const conversationStarters = [
  { label: "🚀 Projects",    value: "Tell me about your projects" },
  { label: "💼 Experience",  value: "What's your professional background and experience?" },
  { label: "📄 Resume",      value: "Share me your resume." },
  { label: "🛠 Skills",      value: "What are your core technical and soft skills?" },
  { label: "🎯 Goals",       value: "What are your career goals and aspirations?" },
  { label: "🏆 Achievements", value: "Share your notable professional achievements" },
];

// Typing cursor blink
const TypingDots = () => (
  <span className="inline-flex items-center gap-[3px] ml-1 align-middle">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1 h-1 rounded-full bg-[#64ffda] animate-bounce"
        style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
      />
    ))}
  </span>
);

const EmptyState = ({ handleSubmit }: { handleSubmit: (msg: string) => void }) => {
  const { welcomeMessage, isWelcomeLoading } = useMessages();
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  // Typewriter effect for welcome message
  useEffect(() => {
    if (!welcomeMessage) return;
    setDisplayedText("");
    setTypingDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < welcomeMessage.length) {
        setDisplayedText(welcomeMessage.slice(0, i + 1));
        i++;
      } else {
        setTypingDone(true);
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [welcomeMessage]);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-4 py-8 overflow-x-hidden">

      {/* Avatar / icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="relative mb-5"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-[#64ffda]/20 blur-xl scale-150" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#64ffda]/20 to-[#8b5cf6]/20 border border-[#64ffda]/30 flex items-center justify-center backdrop-blur-sm">
          <Sparkles size={28} className="text-[#64ffda]" />
        </div>
        {/* Small pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#64ffda]/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Welcome message area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="text-center mb-6 min-h-[60px] max-w-sm px-2"
      >
        <AnimatePresence mode="wait">
          {isWelcomeLoading && !welcomeMessage ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {/* Skeleton shimmer lines */}
              <div className="h-3 rounded-full bg-white/10 shimmer w-3/4 mx-auto" />
              <div className="h-3 rounded-full bg-white/10 shimmer w-full mx-auto" />
              <div className="h-3 rounded-full bg-white/10 shimmer w-2/3 mx-auto" />
            </motion.div>
          ) : welcomeMessage ? (
            <motion.p
              key="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-300 leading-relaxed"
            >
              {displayedText}
              {!typingDone && <TypingDots />}
            </motion.p>
          ) : (
            <motion.div key="fallback" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-lg text-gray-200 font-medium">Hey you! 👋</p>
              <p className="text-sm text-gray-400 mt-1">
                Break the ice or try these conversation starters
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Conversation starter chips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 max-w-xs"
      >
        {conversationStarters.map((starter, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 + index * 0.06, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubmit(starter.value)}
            className="relative px-3.5 py-1.5 bg-[#64ffda]/5 hover:bg-[#64ffda]/15
                       border border-[#64ffda]/20 hover:border-[#64ffda]/50
                       rounded-full transition-all duration-200 group
                       focus:outline-none focus:ring-2 focus:ring-[#64ffda]/40"
          >
            {/* chip glow on hover */}
            <div className="absolute inset-0 rounded-full bg-[#64ffda]/0 group-hover:bg-[#64ffda]/5 blur-sm transition-all duration-300" />
            <span className="relative text-xs text-gray-300 group-hover:text-[#64ffda] font-medium transition-colors duration-200">
              {starter.label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Divider hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-xs text-gray-500 font-mono tracking-wider"
      >
        or type anything below ↓
      </motion.p>
    </div>
  );
};

export default EmptyState;
