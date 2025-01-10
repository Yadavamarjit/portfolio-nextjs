"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
              className={`max-w-[80%] px-3 no-scrollbar py-1 ${
                message.role === "user"
                  ? "bg-[#47477f4a] rounded-3xl text-white"
                  : "text-white overflow-x-scroll"
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
