// POST /api/sync/run
// Master sync: pulls GitHub data + todos from DB, formats chunks, upserts to Pinecone
// Called by the local cron script every 6h

import connectToDatabase from "@/DB/mongo";
import Todo from "@/Schema/todo";
import { generateEmbedding } from "@/embedding";
import { initPinecone } from "@/DB/pincone";

export const maxDuration = 60;

function isAuthorized(req) {
  const key = req.headers.get("x-admin-key");
  return key === process.env.SYNC_SECRET;
}

// Upsert an array of { id, content } chunks into Pinecone namespace "info"
async function upsertChunks(chunks) {
  const index = initPinecone();
  const upserts = [];

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk.content);
    upserts.push({
      id: chunk.id,
      values: embedding,
      metadata: { content: chunk.content },
    });
  }

  if (upserts.length > 0) {
    await index.namespace("info").upsert(upserts);
  }
  return upserts.length;
}

// Build todo chunks from DB records
function buildTodoChunks(todos) {
  const now = new Date().toISOString().slice(0, 10);

  const active = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  // Group active by category
  const byCategory = {};
  for (const t of active) {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category].push(t);
  }

  const categoryLines = Object.entries(byCategory)
    .map(([cat, items]) => {
      const lines = items
        .map((t) => `  - [${t.priority.toUpperCase()}] ${t.title}${t.notes ? ` (${t.notes})` : ""}`)
        .join("\n");
      return `${cat.charAt(0).toUpperCase() + cat.slice(1)}:\n${lines}`;
    })
    .join("\n\n");

  const recentDone = completed
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 10)
    .map((t) => `  - ${t.title} [${t.category}] (done ${t.completedAt?.toISOString?.()?.slice(0, 10) ?? "recently"})`)
    .join("\n");

  const chunks = [];

  if (active.length > 0) {
    chunks.push({
      id: "todos-active",
      content: `(meta: current tasks what are you working on this week daily tasks goals todo list activities)
Amarjit's current active tasks and goals (${now}):
${categoryLines}
Total active: ${active.length}`,
    });
  }

  if (completed.length > 0) {
    chunks.push({
      id: "todos-completed",
      content: `(meta: completed tasks achievements recent accomplishments what did you finish)
Recently completed tasks by Amarjit:
${recentDone}`,
    });
  }

  return chunks;
}

export async function POST(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = { github: null, todos: null, errors: [] };
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const adminKey = process.env.SYNC_SECRET;

  // ── 1. GitHub sync ─────────────────────────────────────────────────────────
  try {
    const ghRes = await fetch(`${origin}/api/sync/github`, {
      headers: { "x-admin-key": adminKey },
    });
    if (!ghRes.ok) throw new Error(`GitHub route returned ${ghRes.status}`);
    const { chunks: ghChunks } = await ghRes.json();
    const count = await upsertChunks(ghChunks);
    results.github = { chunksUpserted: count };
  } catch (err) {
    console.error("GitHub sync failed:", err.message);
    results.errors.push(`github: ${err.message}`);
  }

  // ── 2. Todo sync ───────────────────────────────────────────────────────────
  try {
    await connectToDatabase();
    const todos = await Todo.find({ syncToAI: true }).lean();
    const todoChunks = buildTodoChunks(todos);
    const count = todoChunks.length > 0 ? await upsertChunks(todoChunks) : 0;
    results.todos = { chunksUpserted: count, totalTodos: todos.length };
  } catch (err) {
    console.error("Todo sync failed:", err.message);
    results.errors.push(`todos: ${err.message}`);
  }

  const status = results.errors.length > 0 ? 207 : 200;
  return Response.json({
    success: results.errors.length === 0,
    syncedAt: new Date().toISOString(),
    results,
  }, { status });
}
