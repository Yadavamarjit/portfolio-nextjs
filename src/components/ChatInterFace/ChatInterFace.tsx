"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { addMessageType } from "@/types/messageTypes";

interface Message {
  timestamp: Date;
  userId: string;
  userMessage?: string;
  systemResponse?: string;
}

const ChatInterface = ({
  messages: allMessages,
  addMessage,
}: {
  messages: addMessageType[];
  addMessage: (message: addMessageType[]) => void;
}) => {
  const [messages, setMessages] = useState<addMessageType[]>(allMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesis =
    typeof window !== "undefined" ? window.speechSynthesis : null;
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as any).webkitSpeechRecognition
    ) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
    }

    if (recognitionRef.current) {
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setAutoSpeak(true); // Enable auto-speaking when using voice input
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const cleanMarkdown = (text: string) => {
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
    utterance.pitch = 0.8;
    utterance.rate = 1.2;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    speechSynthesis.speak(utterance);
    utterance.onend = () => {
      autoSpeak && recognitionRef.current.start();
    };
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // isListening && recognitionRef.current.stop();

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    if (isListening) {
      recognitionRef.current?.stop();
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date().toString(),
      },
    ]);
    addMessage([
      { role: "user", content: userMessage, timestamp: new Date().toString() },
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
          { role: "assistant", content: msg, timestamp: new Date().toString() },
        ]);
      }

      addMessage([
        { role: "assistant", content: msg, timestamp: new Date().toString() },
      ]);

      // Auto-speak the response if speech input was used
      if (autoSpeak) {
        speak(msg);
      }
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
      if (isListening) {
        recognitionRef.current?.start();
      }
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
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded transition-colors ${
            isListening
              ? "bg-red-500 hover:bg-red-600"
              : "bg-[#47477f4a] hover:bg-[#3838674a]"
          }`}
        >
          {isListening ? (
            <MicOff size={20} className="text-gray-300" />
          ) : (
            <Mic size={20} className="text-gray-300" />
          )}
        </button>
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
