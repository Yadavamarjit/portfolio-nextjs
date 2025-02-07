"use client";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Send, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { addMessageType } from "@/types/messageTypes";
import EmptyState from "../EmtypMessageState/EmtypMessageState";

// Separate MessageInput component to prevent re-renders of the entire chat
const MessageInput = memo(
  ({
    onSubmit,
    isLoading,
  }: {
    onSubmit: (message: string) => void;
    isLoading: boolean;
  }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      onSubmit(input.trim());
      setInput("");
    };

    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
    );
  }
);

MessageInput.displayName = "MessageInput";

// Separate Message component to prevent re-renders of all messages
const Message = memo(
  ({
    message,
    index,
    isLast,
    isLoading,
    isSpeaking,
    onSpeak,
  }: {
    message: addMessageType;
    index: number;
    isLast: boolean;
    isLoading: boolean;
    isSpeaking: number | null;
    onSpeak: (text: string, index: number) => void;
  }) => {
    return (
      <div
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
              <ReactMarkdown
                className="leading-relaxed"
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre
                      {...props}
                      className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4"
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      {...props}
                      className="dark:bg-gray-700 px-1 py-0.5 rounded text-sm"
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="my-1 leading-relaxed" />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-inside my-1.5 space-y-2" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      {...props}
                      className="list-decimal list-inside my-4 space-y-2"
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            )}
          </div>
          {message.role === "assistant" && (!isLast || !isLoading) && (
            <button
              onClick={() => onSpeak(message.content, index)}
              className="mt-1 p-1 hover:bg-[#47477f4a] rounded transition-colors"
            >
              {isSpeaking === index ? (
                <VolumeX size={16} className="text-gray-300" />
              ) : (
                <Volume2 size={16} className="text-gray-300" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Message.displayName = "Message";

const ChatInterface = ({
  messages: allMessages,
  addMessage,
}: {
  messages: addMessageType[];
  addMessage: (message: addMessageType[]) => void;
}) => {
  const [messages, setMessages] = useState<addMessageType[]>(allMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<null | number>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesis =
    typeof window !== "undefined" ? window.speechSynthesis : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const cleanMarkdown = useCallback((text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/#{1,6}\s(.*)/g, "$1")
      .replace(/\n\s*[-*+]\s/g, ". ")
      .replace(/\n/g, " ")
      .trim();
  }, []);

  const speak = useCallback(
    (text: string, index: number) => {
      if (!speechSynthesis) return;

      speechSynthesis.cancel();

      if (isSpeaking !== null) {
        setIsSpeaking(null);
        return;
      }

      const cleanedText = cleanMarkdown(text);
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.voice = speechSynthesis.getVoices()[0];
      utterance.pitch = 0.8;
      utterance.rate = 1.2;
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);

      setIsSpeaking(index);
      speechSynthesis.speak(utterance);
    },
    [speechSynthesis, isSpeaking, cleanMarkdown]
  );

  const handleSubmit = useCallback(
    async (userMessage: string) => {
      setIsLoading(true);

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: userMessage,
          timestamp: new Date().toString(),
        },
      ]);

      addMessage([
        {
          role: "user",
          content: userMessage,
          timestamp: new Date().toString(),
        },
      ]);

      try {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "", timestamp: new Date().toString() },
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
            {
              role: "assistant",
              content: msg,
              timestamp: new Date().toString(),
            },
          ]);
        }

        addMessage([
          { role: "assistant", content: msg, timestamp: new Date().toString() },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, there was an error processing your request.",
            timestamp: new Date().toString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage]
  );

  return (
    <>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Message
              key={message.timestamp}
              message={message}
              index={index}
              isLast={index === messages.length - 1}
              isLoading={isLoading}
              isSpeaking={isSpeaking}
              onSpeak={speak}
            />
          ))
        ) : (
          <EmptyState handleSubmit={handleSubmit} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
};

export default ChatInterface;
