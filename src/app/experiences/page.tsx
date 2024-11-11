"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import StarsCanvas from "@/components/StarCanvas/StarCanvas";
import { Building2, Briefcase, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Experience {
  company: string;
  role: string;
  period: string;
  projects: {
    title: string;
    points: string[];
  }[];
}

const experiences: Experience[] = [
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
    company: "Borderfree Technologies",
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

const ExperiencePage = () => {
  const [activeCompany, setActiveCompany] = useState<string>(
    experiences[0].company
  );
  const searchParams = useSearchParams();
  const name = searchParams.get("company");
  const companyId: number | null = name !== null ? Number(name) : null;
  useEffect(() => {
    if (companyId && experiences[companyId]) {
      setActiveCompany(experiences[companyId].company);
    }
  }, []);

  return (
    <div className="relative z-0 min-h-screen text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className=" md:text-5xl tracking-wide text-center font-serif">
            Professional Journey
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Company Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="space-y-4 sticky top-1">
              {experiences.map((exp) => (
                <motion.div
                  key={exp.company}
                  onClick={() => setActiveCompany(exp.company)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 backdrop-blur border ${
                    activeCompany === exp.company
                      ? "border-sky-400/50"
                      : "hover:bg-sky-900/20 border-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-6 h-6 bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent" />
                    <div>
                      <h3 className="font-semibold text-lg bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-gray-400">{exp.period}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-8"
          >
            {experiences
              .find((exp) => exp.company === activeCompany)
              ?.projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-8 backdrop-blur border border-white/5 p-5 rounded-md"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Briefcase className="w-5 h-5 bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent" />
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {project.points.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <ArrowRight className="w-4 h-4 bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent mt-1 flex-shrink-0" />
                        <p className="text-gray-300">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
      <StarsCanvas />
    </div>
  );
};

export default ExperiencePage;
