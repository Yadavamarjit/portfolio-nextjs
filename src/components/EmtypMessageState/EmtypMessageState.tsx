import React from "react";
import { MessageCircle } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] px-4">
      <div className="bg-[#47477f4a] rounded-full p-4 mb-4">
        <MessageCircle size={32} className="text-gray-300" />
      </div>
      <p className="text-lg text-gray-300 font-medium">Hey you! 👋</p>
      <p className="text-sm text-gray-400 mt-2 text-center">
        Break the ice with a hello
      </p>
    </div>
  );
};

export default EmptyState;
