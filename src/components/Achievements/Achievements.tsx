"use client";
import React, { useEffect, useRef, useState } from "react";
import { Award, TrendingUp, Users, Zap, Maximize2, X, CheckCircle2 } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const useCounter = (target: number, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const StatCard = ({
  value,
  suffix,
  label,
  icon: Icon,
  color,
  delay,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: string;
  delay: number;
  started: boolean;
}) => {
  const count = useCounter(value, 1800, started);
  return (
    <motion.div
      className="relative group rounded-2xl border border-white/10 bg-gradient-to-b from-[#112240]/80 via-[#0d1b2a]/90 to-[#0a192f] p-4 sm:p-5 lg:p-6 overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(100,255,218,0.12)] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ borderColor: "rgba(100,255,218,0.35)", y: -3 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}18 0%, transparent 75%)`,
        }}
      />
      <div className="relative z-10 flex items-center justify-between mb-3 sm:mb-4">
        <div
          className="p-2 sm:p-2.5 rounded-xl border border-white/5"
          style={{ background: `${color}15` }}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
        </div>
        <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-secondary border border-white/5">
          Verified
        </span>
      </div>
      <div className="relative z-10">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tabular-nums tracking-tight">
            {count}
          </span>
          <span className="text-lg sm:text-2xl font-bold" style={{ color }}>
            {suffix}
          </span>
        </div>
        <p className="text-secondary/80 text-xs sm:text-sm mt-1.5 font-medium leading-snug">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  category: string;
}

const CertificatesShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [started, setStarted] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (isInView) setStarted(true);
  }, [isInView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  const stats = [
    { value: 45, suffix: "%", label: "Page load time reduced", icon: Zap, color: "#64ffda", delay: 0 },
    { value: 35, suffix: "%", label: "Customer engagement boost", icon: TrendingUp, color: "#818cf8", delay: 0.1 },
    { value: 1000, suffix: "+", label: "Merchant connections", icon: Users, color: "#f472b6", delay: 0.2 },
    { value: 4, suffix: "yrs", label: "Professional experience", icon: Award, color: "#fbbf24", delay: 0.3 },
  ];

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Data Science & Analytics",
      issuer: "UpGrad Campus",
      date: "May 2023",
      imageUrl: "/assets/DS.png",
      category: "Certification",
    },
    {
      id: 2,
      title: "Top Reader Year 2024",
      issuer: "Daily.dev",
      date: "December 2024",
      imageUrl: "/assets/reader.png",
      category: "Achievement",
    },
  ];

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider text-[#64ffda] bg-[#64ffda]/10 border border-[#64ffda]/25 mb-3">
          <Award className="w-3.5 h-3.5 text-[#64ffda]" />
          Proven Track Record
        </div>
        <motion.h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Achievements &amp; Certifications
        </motion.h3>
        <motion.p
          className="text-secondary mt-1.5 text-sm sm:text-base font-normal max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Key performance milestones, verified credentials, and active industry participation.
        </motion.p>
      </div>

      {/* Stat counters — 2×2 on mobile, 4×1 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-12">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} started={started} />
        ))}
      </div>

      {/* Certificate cards — stacked on mobile, 2 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            className="group relative rounded-2xl bg-gradient-to-b from-[#112240]/90 via-[#0c1829] to-[#0a192f] border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#64ffda]/40 hover:shadow-[0_10px_35px_rgba(100,255,218,0.12)] flex flex-col justify-between"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            {/* Header info */}
            <div className="p-4 sm:p-5 lg:p-6 pb-3 sm:pb-4 flex items-start justify-between gap-3 border-b border-white/5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#64ffda] bg-[#64ffda]/10 px-2 py-0.5 rounded-full border border-[#64ffda]/25">
                    <CheckCircle2 size={11} /> {cert.category}
                  </span>
                  <span className="text-xs text-secondary/60 font-mono">• {cert.date}</span>
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight truncate">
                  {cert.title}
                </h4>
                <p className="text-xs sm:text-sm text-secondary/80 font-medium mt-0.5">
                  Issued by <span className="text-white/90">{cert.issuer}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-[#64ffda] border border-[#64ffda]/30 bg-[#64ffda]/5 hover:bg-[#64ffda]/15 transition-colors shrink-0"
                aria-label={`Enlarge ${cert.title}`}
              >
                <Maximize2 size={12} />
                <span className="hidden sm:inline">Enlarge</span>
              </button>
            </div>

            {/* Certificate Framing: Full image, ZERO clipping */}
            <div className="p-3 sm:p-5 flex-1 flex flex-col justify-center">
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative w-full h-[220px] sm:h-[280px] md:h-[300px] lg:h-[320px] rounded-xl bg-[#040d1a] border border-white/10 overflow-hidden flex items-center justify-center p-2 sm:p-4 group/frame cursor-pointer transition-all duration-300 hover:border-[#64ffda]/50 shadow-inner"
              >
                {/* Ambient glow behind certificate */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#64ffda]/5 via-transparent to-indigo-500/5 opacity-50 group-hover/frame:opacity-100 transition-opacity" />

                {/* The Certificate Image - object-contain ensures ZERO crop */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src={cert.imageUrl}
                    alt={`${cert.title} certificate - ${cert.issuer}`}
                    width={cert.id === 1 ? 901 : 640}
                    height={640}
                    className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover/frame:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 z-20 bg-[#0a192f]/60 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-[#0a192f]/90 border border-[#64ffda]/40 flex items-center gap-1.5 shadow-lg">
                    <Maximize2 size={13} className="text-[#64ffda]" /> Click to view full size
                  </span>
                </div>

                {/* Mobile tap indicator */}
                <span className="sm:hidden absolute bottom-2 right-2 z-20 text-[10px] font-mono text-[#64ffda] bg-[#0a192f]/90 px-2 py-0.5 rounded border border-[#64ffda]/30 flex items-center gap-1">
                  <Maximize2 size={9} /> Tap to expand
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal for High-Resolution View */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col rounded-2xl bg-[#0b1728] border border-[#64ffda]/30 shadow-2xl overflow-hidden"
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-[#071322]">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-[#64ffda] font-mono">
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 sm:p-2 rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Full Image Container */}
              <div className="relative p-3 sm:p-6 flex-1 flex items-center justify-center overflow-auto bg-[#040a14] max-h-[calc(92vh-80px)]">
                <Image
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  width={selectedCert.id === 1 ? 901 : 640}
                  height={640}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificatesShowcase;
