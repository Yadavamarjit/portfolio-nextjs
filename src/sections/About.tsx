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
import { use, useEffect, useMemo, useRef, useState } from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import AchievementsShowcase from "@/components/Achievements/Achievements";
// import MapWithPin from "@/components/Map/Map";
import dynamic from "next/dynamic";
import Map from "@/components/Map/Map";

const hobbies = [
  { title: "Gaming", icon: "🎮", top: "25%", left: "50%" },
  { title: "Treaking", icon: "🚵", top: "5%", left: "10%" },
  { title: "Gym", icon: "🏋️", top: "25%", left: "5%" },
  { title: "Music", icon: "🎧", top: "45%", left: "3%" },
  { title: "Hiking", icon: "🥾", top: "50%", left: "50%" },
  { title: "Traveling", icon: "✈️", top: "65%", left: "1%" },
  { title: "Puzzles", icon: "🧩", top: "70%", left: "35%" },
  { title: "Movies", icon: "🎬", top: "35%", left: "25%" },
  { title: "MMA", icon: "🥊", top: "70%", left: "65%" },
  { title: "Gardening", icon: "🌱", top: "0%", left: "45%" },
];

export const AboutSection = () => {
  // const MapWithPin = dynamic(() => import("@/components/Map/Map"), {
  //   ssr: false,
  // });
  // const MapWithPin = useMemo(
  //   () =>
  //     dynamic(() => import("@/components/Map/Map"), {
  //       loading: () => <p>A map is loading</p>,
  //       ssr: false,
  //     }),
  //   []
  // );
  const dragConstraintRef = useRef(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
  }, []);
  return (
    <div className="sec-container " id="about">
      <SectionTitle title="About Me" />
      <AchievementsShowcase />
      <div className="mt-10 flex flex-col gap-6">
        <div className="grid md:grid-cols-5 md:gap-8 gap-y-6">
          {" "}
          <Card className="h-[320px] p-0 relative col-span-3">
            <div>
              <CardHeader
                className="p-6"
                title="My Tools"
                description="Explore the book shaping my perspective"
              />
            </div>
            <div className="flex flex-col gap-8 mt-2">
              <ToolBoxItems />
              <ToolBoxItems reverse={true} />
            </div>
          </Card>
          <Card className="h-[320px] p-0 flex flex-col col-span-3 lg:col-span-2 ">
            <div>
              <CardHeader
                className="p-6"
                title="Beyond the code"
                description="Explore what I do beyond coding."
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
          {/* <Card className="h-[320px] p-0 relative col-span-2">
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
            </Card> */}
        </div>
        <Card className="h-96 p-0">
          <Map />
        </Card>
      </div>
    </div>
  );
};
