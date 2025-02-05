"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
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

  useEffect(() => {
    fetchMessages();
  }, []);
  const addMessage = (messages: addMessageType[]) => {
    setMessages((prev) => [...prev, ...messages]);
  };

  const toggleMsg = () => setShowMsg(!showMsg);
  const value = {
    messages,
    loading,
    error,
    fetchMessages,
    addMessage,
    toggleMsg,
    showMsg,
    setShowMsg,
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
