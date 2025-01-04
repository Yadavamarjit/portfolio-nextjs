"use client";
import { Card } from "@/components/Card/Card";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import StarIcon from "@/assets/icons/star.svg";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";

import mapImage from "@/assets/images/map.png";
import memoji from "@/assets/images/memoji-smile.png";
import CardHeader from "@/components/CardHeader/CardHeader";
import { ToolBoxItems } from "@/components/ToolBoxItems/ToolBoxItems";
import { motion } from "framer-motion";
import { useRef } from "react";

const hobbies = [
  { title: "Gaming", icon: "🎮", top: "25%", left: "50%" },
  { title: "Reading", icon: "📚", top: "5%", left: "10%" },
  { title: "Gym", icon: "🏋️", top: "10%", left: "75%" },
  { title: "Music", icon: "🎧", top: "45%", left: "3%" },
  { title: "Hiking", icon: "🥾", top: "50%", left: "50%" },
  { title: "Traveling", icon: "✈️", top: "65%", left: "1%" },
  { title: "Puzzles", icon: "🧩", top: "70%", left: "35%" },
  { title: "Movies", icon: "🎬", top: "25%", left: "25%" },
  { title: "MMA", icon: "🥊", top: "70%", left: "65%" },
  { title: "Gardening", icon: "🌱", top: "0%", left: "45%" },
];

export const AboutSection = () => {
  const dragConstraintRef = useRef(null);
  return (
    <div className="py-20">
      <div className="container mt-20">
        <SectionHeader
          title="About Me"
          subtitle="A Glimpse into my World"
          description="Learn about who I'm and what I do, and what inspires me"
        />
        <div className="mt-20 flex flex-col gap-6">
          <div className="md:grid md:grid-cols-5 md:gap-8">
            <Card className="h-[320px] col-span-2">
              <CardHeader
                title="My Reads"
                description="Explore the book shaping my perspective"
              />
              <div className="mx-auto mt-8 w-40">
                <Image src={bookImage} alt="book" />
              </div>
            </Card>
            <Card className="h-[320px] px-0 col-span-3">
              <div>
                <CardHeader
                  title="My Tools"
                  description="Explore the book shaping my perspective"
                  className="px-6"
                />
              </div>
              <div className="flex flex-col gap-8 mt-6">
                <ToolBoxItems />
                <ToolBoxItems reverse={true} />
              </div>
            </Card>
          </div>
          <div className="md:grid md:grid-cols-5 md:gap-8">
            <Card className="h-[320px] p-0 flex flex-col col-span-3">
              <div>
                <CardHeader
                  className="p-6"
                  title="Beyond the code"
                  description="Explore the book shaping my perspective"
                />
              </div>
              <div className="relative flex-1" ref={dragConstraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex cursor-pointer items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full absolute py-1.5"
                    style={{ top: hobby.top, left: hobby.left }}
                    drag
                    dragConstraints={dragConstraintRef}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.icon}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="h-[320px] p-0 relative col-span-2">
              <Image
                className="h-full w-full object-cover"
                src={mapImage}
                alt="map"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/20 ">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image className="size-20" src={memoji} alt="map" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
