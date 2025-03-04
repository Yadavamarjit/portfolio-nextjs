"use client";
import React, { useRef, useState } from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { ArrowRight, BadgeCheck, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "Dpanda",
    role: "Tech Lead",
    period: "Jan 2024 - Present",
    projects: [
      {
        title: "Microsite Optimization and Customization",
        points: [
          "Engineered advanced performance optimization strategies, achieving a 45% reduction in page load times, which led to a 10% increase in user engagement and a seamless user experience.",
          "Developed reusable and customizable components, enabling microsite themes to be tailored to different publisher applications.",
          "Spearheaded and mentored a high-performing team of 4 developers, driving the optimization of site performance and consistently delivering exceptional user experiences.",
        ],
      },
      {
        title: "Notification Manager Development",
        points: [
          "Designed and developed an end-to-end notification management system, supporting WebSocket communication using Socket.IO, Node.js, Express.js, and EC2.",
          "Built an intuitive real-time dashboard for send targeted notifications to users and monitor live traffic.",
          "Enabled real-time traffic analytics for publishers with <100ms latency, enhancing operational visibility and efficiency.",
        ],
      },
    ],
  },
  {
    company: "Borderfree",
    role: "Software Developer",
    period: "Oct 2021 - Jan 2024",
    projects: [
      {
        title: "Cross-platform Checkout Integration and Discount Mechanism",
        points: [
          "Architected a robust and seamless checkout integration, facilitating secure transactions across multiple stores.",
          "Designed and implemented advanced discount strategies, including percentage-based, promotional codes, and targeted offers, driving a 35% increase in customer engagement.",
          "Boosted sales revenue by 20% through data-driven promotional campaigns and enhanced user experiences.",
        ],
      },
      {
        title: "Revo Shopify Integration",
        points: [
          "Developed OAuth 2.0-based authentication system supporting 1000+ merchant connections.",
          "Automated store setup process reducing integration time from 2 hours to 5 minutes.",
          "Achieved 98% positive merchant feedback with a 60% reduction in support tickets.",
        ],
      },
      {
        title: "Internet Speed Test",
        points: [
          "Developed an interactive speed test tool, delivering instant and accurate upload/download speed metrics for over 20,000 monthly users.",
          "Optimized performance evaluation for live streaming scenarios, improving speed analysis accuracy by 25%.",
          "Empowered users to make data-driven decisions about their internet connectivity, enhancing usability and reliability.",
        ],
      },
    ],
  },
];
import { motion, useInView } from "framer-motion";

const Experiences = () => {
  const [activeCompany, setActiveCompany] = useState(experiences[0].company);
  const activeExperience = experiences.find(
    (exp) => exp.company === activeCompany
  );
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
  };

  const experienceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="sec-container pb-10 lg:pb-20" ref={ref}>
      <SectionTitle title="Where I've Worked" />
      <div className="flex flex-col lg:flex-row gap-8 mt-10 relative">
        <motion.div
          className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible sticky top-2 h-fit"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {experiences.map((exp) => (
            <motion.button
              key={exp.company}
              onClick={() => setActiveCompany(exp.company)}
              className={`lg:p-4 py-2 sm-text min-w-[140px] lg:text-left text-center lg:rounded-lg transition-all duration-300 hover:text-accent/80 hover:bg-accent/5 hover:backdrop-blur ${
                activeCompany === exp.company
                  ? "border-b-2 border-b-accent/40 lg:border-accent/40 lg:border text-accent backdrop-blur"
                  : "text-slate-400 border-transparent"
              }`}
              variants={tabVariants}
              whileHover="hover"
            >
              {exp.company}
            </motion.button>
          ))}
        </motion.div>

        {activeExperience && (
          <motion.div
            className="flex-1 backdrop-blur lg:p-4 rounded-lg border-accent/40 lg:border 2xl:px-10 2xl:py-6"
            variants={experienceVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-2xl font-semibold text-slate-200 2xl:text-4xl">
              {activeExperience.role}{" "}
              <span className="text-emerald-400">
                @ {activeExperience.company}
              </span>
            </h2>
            <p className="text-slate-400 font-medium text-sm mt-2 tracking-widest 2xl:text-lg">
              {activeExperience.period}
            </p>

            <div className="mt-6 space-y-8">
              {activeExperience.projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="space-y-4"
                  variants={projectVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-lg font-medium text-slate-200 2xl:text-2xl">
                    {project.title}
                  </h3>
                  <ul className="space-y-4 sm-text text-pretty">
                    {project.points.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        className="flex gap-2 text-slate-400 leading-relaxed items-center"
                        variants={projectVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: pointIndex * 0.1 }}
                      >
                        <ChevronRight className="flex-shrink-0 text-accent/80" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Experiences;
