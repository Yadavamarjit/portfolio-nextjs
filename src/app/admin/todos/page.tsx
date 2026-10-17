"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Check, Trash2, RefreshCw, LogOut, Lock,
  ChevronDown, Calendar, Tag, Flag, StickyNote,
  Github, Zap, AlertCircle, CheckCircle2, Clock,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Priority = "high" | "medium" | "low";
type Category = "work" | "fitness" | "learning" | "personal" | "other";

interface Todo {
  _id: string;
  title: string;
  notes: string;
  priority: Priority;
  category: Category;
  dueDate: string | null;
  done: boolean;
  completedAt: string | null;
  createdAt: string;
  syncToAI: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; icon: string }> = {
  high:   { label: "High",   color: "text-red-400",    bg: "bg-red-400/10 border-red-400/30",    icon: "🔴" },
  medium: { label: "Medium", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30", icon: "🟡" },
  low:    { label: "Low",    color: "text-green-400",  bg: "bg-green-400/10 border-green-400/30",  icon: "🟢" },
};

const CATEGORY_CONFIG: Record<Category, { label: string; icon: string; color: string }> = {
  work:     { label: "Work",     icon: "💼", color: "text-blue-400" },
  fitness:  { label: "Fitness",  icon: "🏋️", color: "text-orange-400" },
  learning: { label: "Learning", icon: "📚", color: "text-purple-400" },
  personal: { label: "Personal", icon: "🌿", color: "text-teal-400" },
  other:    { label: "Other",    icon: "✦",  color: "text-gray-400" },
};

const ADMIN_PASSWORD_KEY = "admin_auth";

// ── Login Screen ───────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.trim()) {
      onLogin(pw.trim());
    } else {
      setShaking(true);
      setError(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#64ffda]/10 border border-[#64ffda]/30 flex items-center justify-center mb-4">
            <Lock size={28} className="text-[#64ffda]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-[#8892b0] text-sm mt-1 font-mono">Amarjit&apos;s task dashboard</p>
        </div>

        <motion.form
          animate={shaking ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Enter admin password"
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                error ? "border-red-400/60" : "border-white/10 focus:border-[#64ffda]/50"
              } text-white placeholder-gray-500 focus:outline-none transition-colors text-sm`}
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle size={12} /> Password cannot be empty
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#64ffda]/10 hover:bg-[#64ffda]/20 border border-[#64ffda]/30 hover:border-[#64ffda]/60 text-[#64ffda] font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(100,255,218,0.15)]"
          >
            Unlock Dashboard
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}

// ── Add Todo Form ──────────────────────────────────────────────────────────────
function AddTodoForm({ onAdd, adminKey }: { onAdd: (t: Todo) => void; adminKey: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", notes: "", priority: "medium" as Priority,
    category: "work" as Category, dueDate: "", syncToAI: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ ...form, dueDate: form.dueDate || null }),
      });
      if (!res.ok) throw new Error("Failed");
      const todo: Todo = await res.json();
      onAdd(todo);
      setForm({ title: "", notes: "", priority: "medium", category: "work", dueDate: "", syncToAI: true });
      setOpen(false);
    } catch { /* handled by UI */ }
    finally { setLoading(false); }
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#64ffda]/10 hover:bg-[#64ffda]/20 border border-[#64ffda]/30 hover:border-[#64ffda]/60 text-[#64ffda] text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(100,255,218,0.15)]"
      >
        <Plus size={16} />
        New Task
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="mt-3 overflow-hidden"
          >
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl space-y-4">
              {/* Title */}
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Task title..."
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#64ffda]/40 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
              />

              {/* Notes */}
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Notes (optional)..."
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#64ffda]/40 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors resize-none"
              />

              {/* Row: priority + category + date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-500 font-mono mb-1 flex items-center gap-1"><Flag size={11} /> Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#64ffda]/40 transition-colors"
                  >
                    {(["high", "medium", "low"] as Priority[]).map((p) => (
                      <option key={p} value={p} className="bg-[#112240]">{PRIORITY_CONFIG[p].icon} {PRIORITY_CONFIG[p].label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-mono mb-1 flex items-center gap-1"><Tag size={11} /> Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#64ffda]/40 transition-colors"
                  >
                    {(Object.keys(CATEGORY_CONFIG) as Category[]).map((c) => (
                      <option key={c} value={c} className="bg-[#112240]">{CATEGORY_CONFIG[c].icon} {CATEGORY_CONFIG[c].label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-mono mb-1 flex items-center gap-1"><Calendar size={11} /> Due date</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#64ffda]/40 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Sync toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none w-fit">
                <div
                  onClick={() => setForm({ ...form, syncToAI: !form.syncToAI })}
                  className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${form.syncToAI ? "bg-[#64ffda]/40" : "bg-white/10"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${form.syncToAI ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-xs text-gray-400">Sync to AI assistant</span>
              </label>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#64ffda]/10 hover:bg-[#64ffda]/20 border border-[#64ffda]/30 text-[#64ffda] text-sm font-semibold transition-all disabled:opacity-50"
                >
                  {loading ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Single Todo Row ────────────────────────────────────────────────────────────
function TodoRow({
  todo, adminKey, onToggle, onDelete,
}: {
  todo: Todo; adminKey: string;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const p = PRIORITY_CONFIG[todo.priority];
  const c = CATEGORY_CONFIG[todo.category];

  const handleDelete = async () => {
    setDeleting(true);
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id: todo._id }),
    });
    onDelete(todo._id);
  };

  const handleToggle = async () => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id: todo._id, done: !todo.done }),
    });
    if (res.ok) onToggle(todo._id, !todo.done);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10, height: 0 }}
      transition={{ duration: 0.22 }}
      className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
        todo.done
          ? "border-white/5 bg-white/[0.01] opacity-60"
          : "border-white/10 bg-white/[0.03] hover:border-[#64ffda]/20 hover:bg-white/[0.05]"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.done
            ? "border-[#64ffda] bg-[#64ffda]/20"
            : "border-white/20 hover:border-[#64ffda]/60"
        }`}
      >
        {todo.done && <Check size={11} className="text-[#64ffda]" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-sm font-medium ${todo.done ? "line-through text-gray-500" : "text-white"}`}>
            {todo.title}
          </span>
          {/* Priority badge */}
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${p.bg} ${p.color}`}>
            {p.icon} {p.label}
          </span>
          {/* Category badge */}
          <span className={`text-[10px] font-mono ${c.color}`}>
            {c.icon} {c.label}
          </span>
          {/* AI sync badge */}
          {todo.syncToAI && (
            <span className="text-[10px] font-mono text-[#64ffda]/50 flex items-center gap-0.5">
              <Zap size={9} /> AI
            </span>
          )}
        </div>

        {todo.notes && (
          <p className="text-xs text-gray-500 flex items-start gap-1 mt-0.5">
            <StickyNote size={10} className="mt-0.5 flex-shrink-0" />
            {todo.notes}
          </p>
        )}

        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-600 font-mono">
          <span className="flex items-center gap-1">
            <Clock size={9} />
            {new Date(todo.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
          </span>
          {todo.dueDate && (
            <span className="flex items-center gap-1 text-yellow-500/70">
              <Calendar size={9} />
              Due {new Date(todo.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </span>
          )}
          {todo.done && todo.completedAt && (
            <span className="flex items-center gap-1 text-[#64ffda]/50">
              <CheckCircle2 size={9} />
              Done {new Date(todo.completedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </span>
          )}
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
      >
        {deleting ? <RefreshCw size={13} className="animate-spin" /> : <Trash2 size={13} />}
      </button>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AdminTodosPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "done">("active");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    if (saved) setAdminKey(saved);
  }, []);

  const handleLogin = (pw: string) => {
    sessionStorage.setItem(ADMIN_PASSWORD_KEY, pw);
    setAdminKey(pw);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
    setAdminKey(null);
    setTodos([]);
  };

  const fetchTodos = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    try {
      const res = await fetch("/api/todos?limit=200", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401) { handleLogout(); return; }
      const data: Todo[] = await res.json();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => { if (adminKey) fetchTodos(); }, [adminKey, fetchTodos]);

  const handleSync = async () => {
    if (!adminKey) return;
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/sync/run", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      const gh = data.results?.github?.chunksUpserted ?? 0;
      const td = data.results?.todos?.chunksUpserted ?? 0;
      setSyncResult(`✓ Synced — GitHub: ${gh} chunks, Todos: ${td} chunks`);
    } catch {
      setSyncResult("✗ Sync failed — check console");
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncResult(null), 5000);
    }
  };

  // Filter todos
  const filtered = todos.filter((t) => {
    const statusMatch = filter === "all" ? true : filter === "active" ? !t.done : t.done;
    const catMatch = categoryFilter === "all" ? true : t.category === categoryFilter;
    return statusMatch && catMatch;
  });

  const activeCnt = todos.filter((t) => !t.done).length;
  const doneCnt = todos.filter((t) => t.done).length;

  if (!adminKey) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[#0a192f] text-white">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-[#64ffda]">✦</span> Task Dashboard
            </h1>
            <p className="text-[#8892b0] text-sm font-mono mt-0.5">Amarjit&apos;s personal todo portal</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Sync button */}
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-[#64ffda]/30 text-gray-400 hover:text-[#64ffda] text-sm transition-all duration-200"
              title="Sync to AI (GitHub + Todos → Pinecone)"
            >
              {syncing
                ? <RefreshCw size={14} className="animate-spin text-[#64ffda]" />
                : <Github size={14} />}
              <span className="hidden sm:inline">Sync AI</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl border border-white/10 hover:border-red-400/30 text-gray-500 hover:text-red-400 transition-all duration-200"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        {/* Sync result toast */}
        <AnimatePresence>
          {syncResult && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`mb-4 px-4 py-3 rounded-xl text-sm font-mono border ${
                syncResult.startsWith("✓")
                  ? "bg-[#64ffda]/10 border-[#64ffda]/30 text-[#64ffda]"
                  : "bg-red-400/10 border-red-400/30 text-red-400"
              }`}
            >
              {syncResult}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Active", value: activeCnt, icon: <Clock size={16} />, color: "text-yellow-400" },
            { label: "Done", value: doneCnt, icon: <CheckCircle2 size={16} />, color: "text-[#64ffda]" },
            { label: "Total", value: todos.length, icon: <Tag size={16} />, color: "text-[#8892b0]" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-white/10 bg-white/[0.03] text-center">
              <div className={`flex justify-center mb-1 ${s.color}`}>{s.icon}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add form */}
        <AddTodoForm onAdd={(t) => setTodos((prev) => [t, ...prev])} adminKey={adminKey} />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Status filter */}
          {(["active", "all", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                filter === f
                  ? "bg-[#64ffda]/15 border-[#64ffda]/40 text-[#64ffda]"
                  : "border-white/10 text-gray-500 hover:text-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <div className="w-px h-4 bg-white/10" />
          {/* Category filter */}
          {(["all", ...Object.keys(CATEGORY_CONFIG)] as (Category | "all")[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                categoryFilter === c
                  ? "bg-white/10 border-white/30 text-white"
                  : "border-white/10 text-gray-500 hover:text-gray-300"
              }`}
            >
              {c === "all" ? "All" : `${CATEGORY_CONFIG[c as Category].icon} ${CATEGORY_CONFIG[c as Category].label}`}
            </button>
          ))}
        </div>

        {/* Todo list */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/[0.03] shimmer border border-white/5" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <div className="text-4xl mb-3">🎯</div>
            <p className="font-mono text-sm">No tasks here — add one above.</p>
          </div>
        ) : (
          <motion.div layout className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((todo) => (
                <TodoRow
                  key={todo._id}
                  todo={todo}
                  adminKey={adminKey}
                  onToggle={(id, done) =>
                    setTodos((prev) =>
                      prev.map((t) =>
                        t._id === id ? { ...t, done, completedAt: done ? new Date().toISOString() : null } : t
                      )
                    )
                  }
                  onDelete={(id) => setTodos((prev) => prev.filter((t) => t._id !== id))}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
