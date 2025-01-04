import GraingImg from "@/assets/images/grain.jpg";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
export const Card = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <>
    <div
      className={twMerge(
        "backdrop-blur p-6 rounded-3xl overflow-hidden relative after:content-[''] after:absolute after:inset-0 z-0 after:z-10 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-accent/50 after:pointer-events-none",
        className
      )}
    >
      <div
        className="inset-0 absolute -z-10 opacity-5"
        style={{ backgroundImage: `url(${GraingImg.src})` }}
      ></div>
      {children}
    </div>
  </>
);
