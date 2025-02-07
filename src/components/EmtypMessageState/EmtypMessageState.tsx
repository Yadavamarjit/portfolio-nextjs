import React from "react";
import { MessageCircle } from "lucide-react";
import { addMessageType } from "@/types/messageTypes";
const EmptyState = ({ handleSubmit }: { handleSubmit: any }) => {
  const conversationStarters = [
    {
      label: "Projects",
      value: "Tell me about your projects ",
    },
    {
      label: "Experience",
      value: "What's your professional background and experience?",
    },
    {
      label: "Resume",
      value: "Share me your resume.",
    },
    {
      label: "Skills",
      value: "What are your core technical and soft skills?",
    },
    {
      label: "Goals",
      value: "What are your career goals and aspirations?",
    },
    {
      label: "Achievements",
      value: "Share your notable professional achievements",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-4 py-8 overflow-x-hidden">
      <div className="bg-[#47477f4a] rounded-full p-4 mb-4">
        <MessageCircle size={32} className="text-gray-300" />
      </div>
      <p className="text-lg text-gray-300 font-medium">Hey you! 👋</p>
      <p className="text-sm text-gray-400 mt-2 mb-8 text-center">
        Break the ice with a hello or try these conversation starters
      </p>

      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {conversationStarters.map((starter, index) => (
          <button
            key={index}
            onClick={() => handleSubmit(starter.value)}
            className="group relative px-4 py-2 bg-[#47477f1a] hover:bg-[#47477f40] 
                     border border-[#47477f80] rounded-full transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-[#47477f80]"
          >
            <span className="text-sm text-gray-300 font-medium">
              {starter.label}
            </span>

            {/* Tooltip */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
