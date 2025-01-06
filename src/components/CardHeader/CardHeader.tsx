import React from "react";
import StarIcon from "@/assets/icons/star.svg";
import { twMerge } from "tailwind-merge";
export default function CardHeader({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={twMerge("flex flex-col", className)}>
      <div className="inline-flex items-center gap-2">
        <StarIcon className="size-9 text-emerald-300" />{" "}
        <h3 className="text-3xl text-primary font-bold">{title}</h3>
      </div>
      <p className="text-sm text-secondary font-semibold mt-2">{description}</p>
    </div>
  );
}
