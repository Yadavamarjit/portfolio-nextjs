import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import GraingImg from "@/assets/images/grain.jpg";
import CheckIcon from "@/assets/icons/check-circle.svg";
import ArrowRight from "@/assets/icons/arrow-up-right.svg";
import Image from "next/image";

const portfolioProjects = [
  {
    company: "Acme Corp",
    year: "2022",
    title: "Dark Saas Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://youtu.be/4k7IdSLxh6w",
    image: darkSaasLandingPage,
  },
  {
    company: "Innovative Co",
    year: "2021",
    title: "Light Saas Landing Page",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://youtu.be/7hi5zwO75yc",
    image: lightSaasLandingPage,
  },
  {
    company: "Quantum Dynamics",
    year: "2023",
    title: "AI Startup Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://youtu.be/Z7I5uSRHMHg",
    image: aiStartupLandingPage,
  },
];

export const ProjectsSection = () => {
  return (
    <section className="pb-16">
      <div className="container">
        <div className="flex justify-center"></div>
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text text-center">
          Real world results
        </p>

        <h2 className="text-center font-serif mt-6 text-3xl md:text-5xl">
          Featured Projects
        </h2>
        <p className="text-center mt-4 text-white/60 md:max-w-md mx-auto">
          See how I transformed concept into engaging digital experience
        </p>

        <div className="flex flex-col mt-10 gap-20 md:mt-20">
          {portfolioProjects.map((project, indx) => (
            <div
              key={project.company}
              className="bg-gray-800 sticky top-0 lg:px-20 lg:pr-0 pt-16 p-8 pb-0 md:pt-12 md:px-10 rounded-3xl overflow-hidden after:content-[''] after:absolute after:inset-0 z-0 after:z-10 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none"
              style={{ top: `calc(64px + ${indx * 20}px)` }}
            >
              <div
                className="inset-0 absolute -z-10 opacity-5"
                style={{ backgroundImage: `url(${GraingImg.src})` }}
              ></div>
              <div className="lg:grid lg:grid-cols-2 gap-16">
                <div className="pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent gap-2 bg-clip-text inline-flex font-bold uppercase tracking-widest text-sm">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-4xl md:mt-5 mt-2">
                    {project.title}
                  </h3>

                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />

                  <ul className="mt-4 md:mt-5 flex gap-4 flex-col">
                    {project.results.map((result) => (
                      <li
                        className="flex gap-2 text-sm md:text-base text-white/50 "
                        key={result.title}
                      >
                        <CheckIcon className="size-5 md:size-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="">
                    <button className="bg-white text-gray-950 h-12 rounded-xl font-semibold w-full md:w-auto px-8 flex items-center justify-center gap-2 mt-8">
                      <span>View live site</span>
                      <ArrowRight className="size-4 lg:size-5" />
                    </button>
                  </a>
                </div>
                <div className="relative">
                  <Image
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                    src={project.image}
                    alt={project.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
