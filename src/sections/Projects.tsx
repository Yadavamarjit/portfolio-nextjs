"use client";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useMessages } from "@/context/MessageContext";
import { ExternalLink } from "lucide-react";
import ProjectSearch, { SearchResult } from "@/components/ProjectSearch/ProjectSearch";

export const getRandomColor = () => {
  let previousColors: string[] = [];

  return () => {
    const colorArray = [
      "text-blue-400",
      "text-emerald-400",
      "text-pink-400",
      "text-orange-400",
      "text-yellow-400",
      "text-purple-400",
      "text-cyan-400",
      "text-teal-400",
      "text-lime-400",
      "text-sky-400",
    ];

    const availableColors = colorArray.filter(
      (color) => !previousColors.includes(color)
    );

    if (availableColors.length === 0) {
      previousColors = [];
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const randomColor = availableColors[randomIndex];
    previousColors.push(randomColor);

    return randomColor;
  };
};

// Per-project gradient fallbacks for broken images
const projectGradients: Record<string, string> = {
  AskAmar:       "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  "Fruit Catcher": "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
  StockScope:    "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  QTrip:         "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  QKart:         "linear-gradient(135deg, #232526 0%, #414345 100%)",
};

const projectIcons: Record<string, string> = {
  AskAmar:       "🤖",
  "Fruit Catcher": "🍎",
  StockScope:    "📈",
  QTrip:         "✈️",
  QKart:         "🛒",
};

// ─── Project data ──────────────────────────────────────────────────────────────
const ALL_PROJECTS = [
  {
    id: "askamar",
    projectName: "AskAmar",
    featured: true,
    description:
      "AskAmar is an intelligent chatbot designed to provide accurate and personalized answers about my professional journey, skills, and projects. It uses advanced AI capabilities to understand queries, retrieve relevant information, and offer a seamless, conversational experience for exploring my expertise and career insights.",
    img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/ai.gif?alt=media&token=78359f6b-da87-47fa-9de4-ed89ed0f644f",
    techs: ["NextJS", "MongoDB", "LLM", "PineconeDB", "Javascript"],
    isChat: true,
  },
  {
    id: "fruit-catcher",
    projectName: "Fruit Catcher",
    featured: false,
    description:
      "In this engaging fruit catcher game, players strive to catch falling fruits while avoiding obstacles. The game features a dynamic leaderboard to track top scores, and various in-game power-ups that enhance the gameplay experience.",
    img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1723885548610_Screencastfrom2024-08-1300-51-19-ezgif.com-video-to-gif-converter.gif?alt=media&token=784564de-a40b-434c-a42e-5e647fdbed2b",
    techs: ["React", "ExpressJS", "MongoDB", "Javascript"],
    link: "https://fruits-catcher.netlify.app/",
  },
  {
    id: "stockscope",
    projectName: "StockScope",
    featured: false,
    description:
      "A dynamic user interface that displays real-time stock prices and their detailed analysis, powered by mock data. Designed for intuitive use, it offers insights into stock trends, enabling users to efficiently track and assess stock performance.",
    img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/Screencastfrom2024-09-2215-22-12-ezgif.com-optimize.gif?alt=media&token=0e95e191-901d-4f7b-8079-d740dc0fe7c7",
    techs: ["React", "Javascript", "D3.js"],
    link: "https://tradingscreen.netlify.app/",
  },
  {
    id: "qtrip",
    projectName: "QTrip",
    featured: false,
    description:
      "Your virtual travel hub for immersive exploration. Discover destinations with tags like cycling and skiing, simulate reservations, and manage bookings. Experience hourly activity booking and dive into detailed descriptions and images.",
    img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1705453911139_qtrip.png?alt=media&token=26526642-e083-460d-af18-c205f4b5651f",
    techs: ["ExpressJS", "React", "NodeJS", "Javascript"],
  },
  {
    id: "qkart",
    projectName: "QKart",
    featured: false,
    description:
      'Qkart is an e-commerce web app designed to offer a seamless shopping experience. It features user authentication, allowing secure access to personalized accounts. The app also includes an "Add to Cart" functionality and a demo payment system.',
    img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1705451392416_Screenshot%202024-01-17%20055826.png?alt=media&token=7b89a1cd-26a4-4546-82fb-5fb4ba22609d",
    techs: ["React", "ExpressJS", "MongoDB", "Javascript"],
  },
];

// ─── Empty search state ────────────────────────────────────────────────────────
const NoResults = ({ query }: { query: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 12 }}
    className="col-span-full flex flex-col items-center justify-center py-20 gap-4"
  >
    <div className="text-5xl">🔍</div>
    <p className="text-gray-400 text-sm font-mono text-center max-w-xs">
      No projects matched <span className="text-[#64ffda]">&ldquo;{query}&rdquo;</span>.
      <br />Try something like &ldquo;AI&rdquo; or &ldquo;React&rdquo;.
    </p>
  </motion.div>
);

// ─── Projects Section ──────────────────────────────────────────────────────────
export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toggleMsg } = useMessages();

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  // Derive visible + ordered projects from search result
  const visibleProjects = searchResult
    ? searchResult.results.length === 0
      ? []
      : searchResult.results
          .map((id) => ALL_PROJECTS.find((p) => p.id === id))
          .filter(Boolean) as typeof ALL_PROJECTS
    : ALL_PROJECTS;

  const handleResult = (result: SearchResult | null) => {
    setSearchResult(result);
    // Extract original query from input (tracked separately via debounce in component)
  };

  // Track whether a real search is active (non-null result)
  const isFiltered = searchResult !== null;

  return (
    <section
      className="sec-container relative pt-8 lg:pt-12 !px-4 sm:!px-8 md:!px-16 lg:!px-24 pb-24 md:pb-0"
      id="projects"
      ref={ref}
    >
      <SectionTitle title="Some Things I've Built" />

      {/* ── AI Search bar ── */}
      <div className="mt-8 sm:mt-10">
        <ProjectSearch
          onResult={handleResult}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      </div>

      {/* ── Project grid ── */}
      <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibleProjects.length === 0 && isFiltered ? (
            <NoResults key="no-results" query={searchResult?.explanation || "your query"} />
          ) : (
            visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{
                  layout: { duration: 0.35, ease: "easeInOut" },
                  opacity: { delay: isFiltered ? 0 : index * 0.15, duration: 0.45 },
                  y: { delay: isFiltered ? 0 : index * 0.15, duration: 0.45, ease: "easeOut" },
                  scale: { duration: 0.3 },
                }}
              >
                <ProjectCard
                  project={{
                    ...project,
                    onClick: project.isChat ? toggleMsg : undefined,
                  }}
                  highlighted={isFiltered && index === 0}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ─── Project Card ──────────────────────────────────────────────────────────────
export const ProjectCard = ({
  project,
  highlighted = false,
}: {
  project: any;
  highlighted?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const limit = 22;
  const words = project.description.split(" ");
  const firstWords = words.slice(0, limit).join(" ");
  const hasMoreContent = words.length > limit;

  useEffect(() => {
    if (!imgError) {
      imgTimeoutRef.current = setTimeout(() => {
        if (!imgLoaded) setImgError(true);
      }, 5000);
    }
    return () => {
      if (imgTimeoutRef.current) clearTimeout(imgTimeoutRef.current);
    };
  }, []);

  // 3D tilt via Framer Motion
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200, damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200, damping: 30,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const colorFn = getRandomColor();

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-xl group cursor-default h-full"
    >
      {/* Top-match glow ring when highlighted by search */}
      {highlighted && (
        <motion.div
          className="absolute -inset-[1px] rounded-xl z-0"
          style={{
            background: "linear-gradient(135deg, #64ffda40, #8b5cf640, #64ffda40)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Glassmorphism card */}
      <div
        className={`relative rounded-xl overflow-hidden border bg-white/[0.03] backdrop-blur-xl transition-all duration-500 h-full z-10 ${
          highlighted
            ? "border-[#64ffda]/40 shadow-[0_0_40px_rgba(100,255,218,0.12)]"
            : "border-white/10 group-hover:border-[#64ffda]/30 group-hover:shadow-[0_0_40px_rgba(100,255,218,0.08)]"
        }`}
        style={{ transform: "translateZ(0)" }}
      >
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(100,255,218,0.06) 0%, transparent 60%)`,
          }}
        />

        {/* Top-match badge */}
        {highlighted && (
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest bg-[#64ffda]/15 text-[#64ffda] border border-[#64ffda]/40 backdrop-blur-sm">
              ✦ Best match
            </span>
          </div>
        )}

        {/* Project image / fallback */}
        <div className="relative w-full h-48 2xl:h-56 overflow-hidden">
          {!imgError ? (
            <img
              src={project.img}
              alt={project.projectName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
              onLoad={() => {
                setImgLoaded(true);
                if (imgTimeoutRef.current) clearTimeout(imgTimeoutRef.current);
              }}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{
                background:
                  projectGradients[project.projectName] ??
                  "linear-gradient(135deg, #0a192f, #112240)",
              }}
            >
              <span className="text-5xl">{projectIcons[project.projectName] ?? "💻"}</span>
              <span className="text-[#64ffda]/70 font-mono text-sm tracking-widest">
                {project.projectName}
              </span>
            </div>
          )}

          {/* Featured badge */}
          {project.featured && !highlighted && (
            <div className="absolute top-3 right-3 z-20">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest bg-[#64ffda]/15 text-[#64ffda] border border-[#64ffda]/30 backdrop-blur-sm">
                ✦ Featured
              </span>
            </div>
          )}

          {/* Dark overlay gradient on image bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a192f]/80 to-transparent" />
        </div>

        {/* Card body */}
        <div className="p-5" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-bold text-[#64ffda] mb-1">{project.projectName}</h3>

          <div className="sm-text text-secondary mt-3">
            <p className="text-pretty leading-relaxed">
              {isExpanded ? project.description : firstWords}
              {hasMoreContent && !isExpanded && "..."}
            </p>
            {hasMoreContent && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[#64ffda] hover:text-[#64ffda]/80 mt-2 text-sm font-medium transition-colors"
              >
                {isExpanded ? "See Less ↑" : "See More ↓"}
              </button>
            )}
          </div>

          {/* Tech tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techs.map((tag: string) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-secondary hover:border-[#64ffda]/30 hover:text-[#64ffda] transition-all duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-5 flex gap-3">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 border border-[#64ffda] text-[#64ffda] rounded-lg hover:bg-[#64ffda]/10 transition-all duration-300 text-sm font-medium group/btn">
                  <ExternalLink size={14} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                  View Project
                </button>
              </a>
            )}
            {project.onClick && (
              <button
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 border border-[#64ffda] text-[#64ffda] rounded-lg hover:bg-[#64ffda]/10 transition-all duration-300 text-sm font-medium group/btn"
                onClick={project.onClick}
              >
                <ExternalLink size={14} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                Try it Live
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
