import React from "react";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-x-4">
      {" "}
      {/* <div className="h-0.5 bg-accent rounded-2xled- w-1/2 flex-1"></div> */}
      <div
        className="h-0.5 bg-accent rounded-2xled- w-1/2 flex-1"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      ></div>
      <h2 className="sec-title md:text-4xl text-secondary font-bold backdrop-blur py-2 rounded overflow-hidden">
        {title}
      </h2>
      <div
        className="h-0.5 bg-accent rounded-2xled- w-1/2 flex-1"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      ></div>
    </div>
  );
}
