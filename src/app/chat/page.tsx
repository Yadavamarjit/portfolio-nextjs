"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { m } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to remove duplicate consecutive words
  const removeDuplicateWords = (text: string): string => {
    return text
      .split(" ")
      .filter((word, index, array) => word !== array[index - 1])
      .join(" ");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const response = await fetch(
        window.location.origin + "/api/generate-response",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userPrompt: userMessage }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Failed to get response reader");

      const decoder = new TextDecoder();

      let msg: string = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const parts = chunk.split("data: ").filter((part) => part.trim());
        parts.forEach((part) => {
          msg += part;
        });

        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          { role: "assistant", content: msg },
        ]);

        console.log(parts, msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4 text-black">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.role === "assistant" ? (
                <ReactMarkdown className="prose prose-sm max-w-none prose-pre:bg-gray-700 prose-pre:text-white prose-pre:p-2 prose-pre:rounded">
                  {message.content}
                </ReactMarkdown>
              ) : (
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
