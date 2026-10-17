"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, Loader2 } from "lucide-react";

export interface SearchResult {
  results: string[];       // matched project IDs in relevance order
  explanation: string;     // short human-readable summary
}

interface ProjectSearchProps {
  onResult: (result: SearchResult | null) => void;
  isSearching: boolean;
  setIsSearching: (v: boolean) => void;
}

// Suggested chips shown before the user types
const SUGGESTIONS = [
  "Show me AI projects",
  "Something with React",
  "Data visualization",
  "Full stack apps",
  "Games",
  "E-commerce",
];

const ProjectSearch: React.FC<ProjectSearchProps> = ({
  onResult,
  isSearching,
  setIsSearching,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        onResult(null);
        setExplanation("");
        setHasSearched(false);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch("/api/search-projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        const data: SearchResult = await res.json();
        onResult(data);
        setExplanation(data.explanation ?? "");
        setHasSearched(true);
      } catch {
        onResult(null);
        setExplanation("");
      } finally {
        setIsSearching(false);
      }
    },
    [onResult, setIsSearching]
  );

  // Debounced search on every keystroke
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val.trim()) {
      onResult(null);
      setExplanation("");
      setHasSearched(false);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    debounceRef.current = setTimeout(() => runSearch(val), 600);
  };

  const handleSuggestion = (s: string) => {
    setQuery(s);
    runSearch(s);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery("");
    onResult(null);
    setExplanation("");
    setHasSearched(false);
    setIsSearching(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    inputRef.current?.focus();
  };

  // Clean up debounce on unmount
  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  const showSuggestions = isFocused && !query;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 sm:mb-14 px-1">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-3"
      >
        <Sparkles size={13} className="text-[#64ffda]" />
        <span className="text-xs font-mono tracking-widest text-[#64ffda]/70 uppercase">
          AI-powered search
        </span>
      </motion.div>

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="relative"
      >
        {/* Ambient glow behind the bar */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 -z-10 blur-xl ${
            isFocused
              ? "bg-[#64ffda]/10 scale-105"
              : "bg-transparent scale-100"
          }`}
        />

        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 bg-white/[0.03] backdrop-blur-xl ${
            isFocused
              ? "border-[#64ffda]/50 shadow-[0_0_24px_rgba(100,255,218,0.12)]"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          {/* Leading icon */}
          <div className="flex-shrink-0">
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Loader2 size={18} className="text-[#64ffda] animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Search
                    size={18}
                    className={`transition-colors duration-200 ${
                      isFocused ? "text-[#64ffda]" : "text-gray-500"
                    }`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="e.g. Show me AI projects, or something with React..."
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
          />

          {/* Clear button */}
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
                onClick={handleClear}
                className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestion chips dropdown */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full mt-2 left-0 right-0 z-20 p-3 rounded-2xl border border-white/10 bg-[#0d1f35]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2 px-1">
                Try searching for
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onMouseDown={() => handleSuggestion(s)}
                    className="px-3 py-1.5 text-xs text-gray-300 hover:text-[#64ffda] bg-white/5 hover:bg-[#64ffda]/10 border border-white/10 hover:border-[#64ffda]/30 rounded-full transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Result explanation pill */}
      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="mt-3 flex items-center gap-2"
          >
            <Sparkles size={11} className="text-[#64ffda]/70 flex-shrink-0" />
            {explanation ? (
              <span className="text-xs text-[#64ffda]/70 font-mono">
                {explanation}
              </span>
            ) : (
              <span className="text-xs text-gray-500 font-mono italic">
                No matching projects found — try a different query.
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectSearch;
