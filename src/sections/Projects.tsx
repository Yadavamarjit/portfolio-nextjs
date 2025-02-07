"use client";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMessages } from "@/context/MessageContext";

export const getRandomColor = () => {
  let previousColors: any = [];

  return () => {
    const colorArray = [
      "text-blue-500",
      "text-green-500",
      "text-pink-500",
      "text-orange-500",
      "text-yellow-500",
      "text-purple-500",
      "text-red-500",
      "text-cyan-500",
      "text-teal-500",
      "text-lime-500",
      "text-pink-500",
    ];

    // Filter out previously used colors
    const availableColors = colorArray.filter(
      (color) => !previousColors.includes(color)
    );

    // If all colors have been used, reset the array
    if (availableColors.length === 0) {
      previousColors = [];
    }

    // Get a random index from the available colors
    const randomIndex = Math.floor(Math.random() * availableColors.length);

    // Get the random color and add it to the previously used colors
    const randomColor = availableColors[randomIndex];
    previousColors.push(randomColor);

    return randomColor;
  };
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { toggleMsg } = useMessages();

  const projectsData = [
    {
      projectName: "AskAmar",
      description:
        "AskAmar is an intelligent chatbot designed to provide accurate and personalized answers about my professional journey, skills, and projects. It uses advanced AI capabilities to understand queries, retrieve relevant information, and offer a seamless, conversational experience for exploring my expertise and career insights.",
      img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/ai.gif?alt=media&token=78359f6b-da87-47fa-9de4-ed89ed0f644f",
      techs: ["NextJS", "MongoDB", "LLM", "PineconeDB", "Javascript"],
      // link: "#",
      onClick: toggleMsg,
    },
    {
      projectName: "Fruit Catcher",
      description:
        "In this engaging fruit catcher game, players strive to catch falling fruits while avoiding obstacles. The game features a dynamic leaderboard to track top scores, and various in-game power-ups that enhance the gameplay experience. With its intuitive mechanics and exciting challenges, players are rewarded for their skills and quick reflexes as they compete for the highest score.",
      img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1723885548610_Screencastfrom2024-08-1300-51-19-ezgif.com-video-to-gif-converter.gif?alt=media&token=784564de-a40b-434c-a42e-5e647fdbed2b",
      techs: ["React", "ExpressJS", "MongoDB", "Javascript"],
      link: "https://fruits-catcher.netlify.app/",
    },
    {
      projectName: "StockScope",
      description:
        "A dynamic user interface that displays real-time stock prices and their detailed analysis, powered by mock data. Designed for intuitive use, it offers insights into stock trends, enabling users to efficiently track and assess stock performance.",
      img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/Screencastfrom2024-09-2215-22-12-ezgif.com-optimize.gif?alt=media&token=0e95e191-901d-4f7b-8079-d740dc0fe7c7",
      techs: ["React", "Javascript", "D3.js"],
      link: "https://tradingscreen.netlify.app/",
    },
    {
      projectName: "QTrip",
      description:
        "Your virtual travel hub for immersive exploration. Discover destinations with tags like cycling and skiing, simulate reservations, and manage bookings. Experience hourly activity booking and dive into detailed descriptions and images. Plan your dream journey authentically without real transactions – an innovative way to connect with travel interests.",
      img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1705453911139_qtrip.png?alt=media&token=26526642-e083-460d-af18-c205f4b5651f",
      techs: ["ExpressJS", "React", "NodeJS", "Javascript"],
    },
    {
      projectName: "QKart",
      description:
        'Qkart is an e-commerce web app designed to offer a seamless shopping experience. It features user authentication, allowing secure access to personalized accounts. The app also includes an "Add to Cart" functionality, enabling users to easily manage their desired products. Additionally, Qkart offers a demo payment system, providing a complete and interactive shopping experience from selection to checkout.',
      img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1705451392416_Screenshot%202024-01-17%20055826.png?alt=media&token=7b89a1cd-26a4-4546-82fb-5fb4ba22609d",
      techs: ["React", "ExpressJS", "MongoDB", "Javascript"],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="sec-container relative" id="projects" ref={ref}>
      <SectionTitle title="Some Things I've Built" />
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: index * 0.2 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const ProjectCard = ({ project }: { project: any }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const limit = 20;
  const words = project.description.split(" ");
  const firstTwentyWords = words.slice(0, limit).join(" ");
  const hasMoreContent = words.length > limit;

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="rounded-lg backdrop-blur-3xl transition-shadow border-accent/40 border hover:shadow-accent/10 hover:shadow-2xl">
      <img
        src={project.img}
        alt={project.projectName}
        className="w-full h-48 2xl:h-56 object-cover rounded-t-lg"
      />
      <div className="p-5">
        <motion.h3
          className="text-xl font-bold text-accent"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {project.projectName}
        </motion.h3>
        <motion.div
          className="sm-text text-secondary mt-3"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <p className="text-pretty">
            {isExpanded ? project.description : firstTwentyWords}
            {hasMoreContent && !isExpanded && "..."}
          </p>
          {hasMoreContent && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-accent hover:text-accent/80 mt-2 text-sm font-medium"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </motion.div>
        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          {project.techs.map((tag: string) => (
            <p
              key={tag}
              className={`text-[14px] 2xl:text-xl ${getRandomColor()()}`}
            >
              #{tag}
            </p>
          ))}
        </motion.div>
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <button className="w-full mt-4 group/btn flex items-center justify-center gap-2 px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors duration-300">
              View Project
            </button>
          </motion.a>
        )}
        {project.onClick && (
          <button
            className="w-full mt-4 group/btn flex items-center justify-center gap-2 px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors duration-300"
            onClick={project.onClick}
          >
            View Project
          </button>
        )}
      </div>
    </div>
  );
};
