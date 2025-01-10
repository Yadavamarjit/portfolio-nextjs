"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  timestamp: Date;
  userId: string;
  userMessage?: string;
  systemResponse?: string;
}

const ChatInterface = ({ messages: allMessages }: { messages: Message[] }) => {
  // Transform initial messages into the format we need for the chat
  const transformMessages = (dbMessages: Message[]) => {
    const chatMessages = [];
    for (const msg of dbMessages) {
      if (msg.userMessage) {
        chatMessages.push({
          role: "user" as const,
          content: msg.userMessage,
          timestamp: msg.timestamp,
        });
      }
      if (msg.systemResponse) {
        chatMessages.push({
          role: "assistant" as const,
          content: msg.systemResponse,
          timestamp: msg.timestamp,
        });
      }
    }
    return chatMessages.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  };

  const [messages, setMessages] = useState(transformMessages(allMessages));
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesis =
    typeof window !== "undefined" ? window.speechSynthesis : null;

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links but keep text
      .replace(/`(.*?)`/g, "$1") // Remove inline code
      .replace(/```[\s\S]*?```/g, "") // Remove code blocks
      .replace(/#{1,6}\s(.*)/g, "$1") // Remove headers
      .replace(/\n\s*[-*+]\s/g, ". ") // Convert list items to sentences
      .replace(/\n/g, " ") // Replace newlines with spaces
      .trim();
  };

  const speak = (text: string) => {
    if (!speechSynthesis) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanedText = cleanMarkdown(text);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.voice = speechSynthesis.getVoices()[0];
    utterance.pitch = 0.8; // Normal pitch is 1. Adjust slightly for natural variation (0.8–1.2 works well)
    utterance.rate = 1.2;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage, timestamp: new Date() },
    ]);

    try {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", timestamp: new Date() },
      ]);

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
        const parts = chunk.split("data: ").filter((part) => part);
        parts.forEach((part) => {
          msg += part;
        });

        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          { role: "assistant", content: msg, timestamp: new Date() },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start w-full"
            }`}
          >
            <div
              className={`px-3 no-scrollbar rounded-3xl py-1 flex items-start gap-2 ${
                message.role === "user"
                  ? "bg-[#47477f4a] text-white max-w-[80%]"
                  : "text-white max-w-[95%] py-2 overflow-x-scroll bg-[#5555782e]"
              }`}
            >
              <div className="flex-1">
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
              {message.role === "assistant" && (
                <button
                  onClick={() => speak(message.content)}
                  className="mt-1 p-1 hover:bg-[#47477f4a] rounded transition-colors"
                >
                  {isSpeaking ? (
                    <VolumeX size={16} className="text-gray-300" />
                  ) : (
                    <Volume2 size={16} className="text-gray-300" />
                  )}
                </button>
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
          className="flex-1 py-2 px-4 border text-white border-gray-400 focus:outline-none bg-[#3838674a] focus:border-accent/50 rounded-3xl"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#47477f4a] text-gray-300 p-2 rounded hover:bg-[#3838674a] disabled:bg-[#3333464a] transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </>
  );
};

export default ChatInterface;
