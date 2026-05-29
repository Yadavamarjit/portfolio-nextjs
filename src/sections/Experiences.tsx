"use client";
import React, { useRef, useState } from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    company: "Dpanda",
    role: "Tech Lead",
    period: "Jan 2024 - Present",
    color: "#64ffda",
    projects: [
      {
        title: "Microsite Optimization and Customization",
        points: [
          "Engineered advanced performance optimization strategies, achieving a 45% reduction in page load times, which led to a 10% increase in user engagement.",
          "Developed reusable and customizable components, enabling microsite themes to be tailored to different publisher applications.",
          "Spearheaded and mentored a high-performing team of 4 developers, driving exceptional user experiences.",
        ],
      },
      {
        title: "Notification Manager Development",
        points: [
          "Designed an end-to-end notification management system using Socket.IO, Node.js, Express.js, and EC2.",
          "Built a real-time dashboard for targeted notifications and live traffic monitoring.",
          "Enabled real-time analytics with <100ms latency, enhancing operational visibility.",
        ],
      },
    ],
  },
  {
    company: "Borderfree",
    role: "Software Developer",
    period: "Oct 2021 - Jan 2024",
    color: "#818cf8",
    projects: [
      {
        title: "Cross-platform Checkout & Discount Mechanism",
        points: [
          "Architected a robust checkout integration facilitating secure transactions across multiple stores.",
          "Implemented advanced discount strategies driving a 35% increase in customer engagement.",
          "Boosted sales revenue by 20% through data-driven promotional campaigns.",
        ],
      },
      {
        title: "Revo Shopify Integration",
        points: [
          "Developed OAuth 2.0-based authentication supporting 1000+ merchant connections.",
          "Automated store setup reducing integration time from 2 hours to 5 minutes.",
          "Achieved 98% positive merchant feedback with 60% fewer support tickets.",
        ],
      },
    ],
  },
];

const Experiences = () => {
  const [activeCompany, setActiveCompany] = useState(experiences[0].company);
  const activeExp = experiences.find((e) => e.company === activeCompany)!;
  const ref = useRef(null);

  return (
    <section className="sec-container pt-8 lg:pt-16 pb-10 lg:pb-20 !px-4 sm:!px-8 md:!px-16 lg:!px-24" ref={ref}>
      <SectionTitle title="Where I've Worked" />

      <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Tab selector */}
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1 relative lg:min-w-[180px] pb-1 lg:pb-0">
          {/* Vertical line — desktop only */}
          <div className="hidden lg:block absolute left-4 top-0 bottom-0 w-px bg-white/10" />

          {experiences.map((exp) => (
            <div key={exp.company} className="relative flex items-center lg:items-start lg:mb-6 group">
              {/* Timeline dot — desktop */}
              <motion.button
                onClick={() => setActiveCompany(exp.company)}
                className={`relative z-10 hidden lg:flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 flex-shrink-0 mr-4 ${
                  activeCompany === exp.company
                    ? "border-[#64ffda] bg-[#64ffda]/15 shadow-[0_0_16px_rgba(100,255,218,0.4)]"
                    : "border-white/20 bg-[#0a192f] hover:border-white/40"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeCompany === exp.company ? "bg-[#64ffda]" : "bg-white/30"
                  }`}
                />
              </motion.button>

              {/* Company tab */}
              <motion.button
                onClick={() => setActiveCompany(exp.company)}
                className={`py-2 px-4 sm:px-5 text-sm sm:text-base min-w-[110px] sm:min-w-[140px] text-center lg:text-left rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeCompany === exp.company
                    ? "border-b-2 border-b-[#64ffda]/60 lg:border lg:border-[#64ffda]/30 text-[#64ffda] bg-[#64ffda]/5"
                    : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.03 }}
              >
                <div className="font-semibold">{exp.company}</div>
                <div className="text-xs text-current opacity-60 hidden lg:block mt-0.5">
                  {exp.period.split(" - ")[0]}
                </div>
              </motion.button>
            </div>
          ))}
        </div>

        {/* Content panel */}
        <motion.div
          key={activeCompany}
          className="flex-1 p-4 sm:p-6 rounded-xl border border-[#64ffda]/20 bg-white/[0.02] backdrop-blur"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="mb-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-2xl font-semibold text-slate-200">
                {activeExp.role}
              </h2>
              <span className="text-lg sm:text-2xl font-semibold" style={{ color: activeExp.color }}>
                @ {activeExp.company}
              </span>
            </div>
            <p className="text-slate-400 font-mono text-xs mt-1 tracking-widest mb-5 sm:mb-8">
              {activeExp.period}
            </p>
          </div>

          {/* Projects */}
          <div className="space-y-6 sm:space-y-8">
            {activeExp.projects.map((project, pi) => (
              <motion.div
                key={pi}
                className="space-y-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: pi * 0.1, duration: 0.35 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 rounded-full flex-shrink-0" style={{ background: activeExp.color }} />
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-200 leading-snug">
                    {project.title}
                  </h3>
                </div>

                <ul className="space-y-2.5 ml-2 sm:ml-4">
                  {project.points.map((point, qi) => (
                    <motion.li
                      key={qi}
                      className="flex gap-2 sm:gap-3 text-slate-400 text-sm sm:text-base leading-relaxed items-start"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: pi * 0.1 + qi * 0.06 }}
                    >
                      <ChevronRight
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: activeExp.color }}
                        size={14}
                      />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experiences;
