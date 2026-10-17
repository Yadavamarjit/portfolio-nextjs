"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { addMessageType } from "@/types/messageTypes";
import getCookie from "@/utils/userLocation";

// Define types for your data
interface Message {
  timestamp: Date;
  userId: string;
  userMessage?: string;
  systemResponse?: string;
}

// Define context type
interface MessageContextType {
  messages: addMessageType[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  addMessage: (message: addMessageType[]) => void;
  showMsg: boolean;
  toggleMsg: () => void;
  welcomeMessage: string | null;
  isWelcomeLoading: boolean;
  // Proactive nudge
  showNudge: boolean;
  dismissNudge: () => void;
}

// Create context
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Create provider component
interface MessageProviderProps {
  children: ReactNode;
}

const transformMessages = (dbMessages: Message[]): addMessageType[] => {
  const chatMessages: addMessageType[] = [];
  for (const msg of dbMessages) {
    if (msg.userMessage) {
      chatMessages.push({
        role: "user" as const,
        content: msg.userMessage,
        timestamp: msg.timestamp.toString(),
      });
    }
    if (msg.systemResponse) {
      chatMessages.push({
        role: "assistant" as const,
        content: msg.systemResponse,
        timestamp: msg.timestamp.toString(),
      });
    }
  }
  return chatMessages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<addMessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showMsg, setShowMsg] = useState<boolean>(false);

  // Welcome message state
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [isWelcomeLoading, setIsWelcomeLoading] = useState(false);
  const welcomeFetchedRef = useRef(false);

  // Proactive nudge state
  const [showNudge, setShowNudge] = useState(false);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeDismissedRef = useRef(false);

  const fetchMessages = async () => {
    const userId = getCookie("userId");
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get("/api/messages");
      setMessages(transformMessages(response.data));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Generate personalized welcome message once per session.
  // Uses a DEDICATED endpoint (/api/welcome-message) that streams GPT
  // but NEVER saves to MongoDB — so it never pollutes the chat history.
  const fetchWelcomeMessage = async () => {
    if (welcomeFetchedRef.current) return;
    welcomeFetchedRef.current = true;
    setIsWelcomeLoading(true);
    try {
      const country = getCookie("country_name") || "";
      const region = getCookie("region") || "";

      const response = await fetch("/api/welcome-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, region }),
      });

      if (!response.ok || !response.body) throw new Error("failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let msg = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        chunk.split("data: ").filter(Boolean).forEach((p) => { msg += p; });
        setWelcomeMessage(msg);
      }
    } catch {
      setWelcomeMessage("Hey there! 👋 I'm Amarjit's AI assistant. Ask me anything about his work, skills, or projects!");
    } finally {
      setIsWelcomeLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Proactive nudge: show after 30s of inactivity, only if chat hasn't been opened yet
  useEffect(() => {
    if (nudgeDismissedRef.current || showMsg) return;

    const resetTimer = () => {
      if (nudgeDismissedRef.current) return;
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
      nudgeTimerRef.current = setTimeout(() => {
        if (!showMsg && !nudgeDismissedRef.current) {
          setShowNudge(true);
        }
      }, 30000);
    };

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    };
  }, [showMsg]);

  // Hide nudge when chat opens
  useEffect(() => {
    if (showMsg) setShowNudge(false);
  }, [showMsg]);

  const addMessage = (msgs: addMessageType[]) => {
    setMessages((prev) => [...prev, ...msgs]);
  };

  const toggleMsg = () => {
    const opening = !showMsg;
    setShowMsg(opening);
    // Only fetch welcome on very first open, and only when no prior messages exist
    if (opening && messages.length === 0 && !welcomeFetchedRef.current) {
      fetchWelcomeMessage();
    }
  };

  const dismissNudge = () => {
    nudgeDismissedRef.current = true;
    setShowNudge(false);
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
  };

  const value = {
    messages,
    loading,
    error,
    fetchMessages,
    addMessage,
    toggleMsg,
    showMsg,
    welcomeMessage,
    isWelcomeLoading,
    showNudge,
    dismissNudge,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

// Custom hook to use the context
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};
