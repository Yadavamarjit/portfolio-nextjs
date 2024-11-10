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

import StarIcon from "@/assets/icons/star.svg";

export const TapeSection = () => {
  return (
    <div className="py-16 overflow-x-clip ">
      <div className="bg-gradient-to-r -rotate-3 -mx-1 from-emerald-300 to-sky-400 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 py-3">
          {words.map((word) => (
            <div key={word} className="inline-flex gap-4 items-center">
              <span className=" whitespace-nowrap text-sm uppercase text-gray-900 font-extrabold">
                {word}
              </span>
              <StarIcon className="size-6 text-gray-900 -rotate-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
