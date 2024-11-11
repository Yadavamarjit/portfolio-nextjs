import StarIcon from "@/assets/icons/star.svg";

const words = [
  "Performant",
  "Secure",
  "Interactive",
  "Scalable",
  "Responsive",
  "User-friendly",
  "Reliable",
  "Real-time",
  "Accessible",
  "Fast-loading",
  "Intuitive",
  "Robust",
  "Responsive",
  "SEO-optimized",
  "Cross-platform",
  "Maintainable",
];

export const TapeSection = () => {
  const WordGroup = () => (
    <>
      {words.map((word) => (
        <div key={word} className="inline-flex gap-4 items-center">
          <span className="whitespace-nowrap text-sm uppercase text-gray-900 font-extrabold">
            {word}
          </span>
          <StarIcon className="size-6 text-gray-900 -rotate-12" />
        </div>
      ))}
    </>
  );

  return (
    <div className="py-16 overflow-x-clip">
      <div className="bg-gradient-to-r -rotate-3 -mx-1 from-emerald-300 to-sky-400 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="relative flex overflow-hidden">
          {/* First scroll container */}
          <div className="animate-marquee flex gap-4 py-3 shrink-0">
            <WordGroup />
          </div>

          {/* Second scroll container */}
          <div
            className="animate-marquee flex gap-4 py-3 shrink-0"
            aria-hidden="true"
          >
            <WordGroup />
          </div>
        </div>
      </div>
    </div>
  );
};
