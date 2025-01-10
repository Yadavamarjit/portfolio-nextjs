"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

// Define types for your data
interface Message {
  timestamp: Date;
  userId: string;
  userMessage?: string;
  systemResponse?: string;
}

// Define context type
interface MessageContextType {
  messages: Message[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  addMessage: (message: Omit<Message, "id">) => Promise<void>;
  showMsg: boolean;
  toggleMsg: () => void;
}

// Create context
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Create provider component
interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showMsg, setShowMsg] = useState<boolean>(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/messages");
      console.log("msg res", response.data);
      setMessages(response.data);
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
  const addMessage = async (message: Omit<Message, "id">) => {
    try {
      setLoading(true);
      const response = await axios.post<Message>("/api/messages", message); // Replace with your API endpoint
      setMessages((prev) => [...prev, response.data]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
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
