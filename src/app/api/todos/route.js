import connectToDatabase from "@/DB/mongo";
import Todo from "@/Schema/todo";

// Simple admin key check — header: x-admin-key: <SYNC_SECRET>
function isAuthorized(req) {
  const key = req.headers.get("x-admin-key");
  return key === process.env.SYNC_SECRET;
}

// GET /api/todos?category=work&done=false&limit=50
export async function GET(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const filter = {};
  if (searchParams.get("category")) filter.category = searchParams.get("category");
  if (searchParams.get("done") !== null && searchParams.get("done") !== "")
    filter.done = searchParams.get("done") === "true";
  if (searchParams.get("priority")) filter.priority = searchParams.get("priority");

  const limit = parseInt(searchParams.get("limit") ?? "100");

  const todos = await Todo.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return Response.json(todos);
}

// POST /api/todos  body: { title, notes, priority, category, dueDate, syncToAI }
export async function POST(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();

  const body = await req.json();
  if (!body.title?.trim()) {
    return Response.json({ error: "title is required" }, { status: 400 });
  }

  const todo = await Todo.create({
    title: body.title.trim(),
    notes: body.notes ?? "",
    priority: body.priority ?? "medium",
    category: body.category ?? "work",
    dueDate: body.dueDate ? new Date(body.dueDate) : null,
    syncToAI: body.syncToAI ?? true,
  });

  return Response.json(todo, { status: 201 });
}

// PATCH /api/todos  body: { id, ...fields }  (toggle done, edit title, etc.)
export async function PATCH(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();

  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return Response.json({ error: "id is required" }, { status: 400 });

  // If toggling done, handle completedAt via the pre-save hook
  const todo = await Todo.findById(id);
  if (!todo) return Response.json({ error: "Not found" }, { status: 404 });

  Object.assign(todo, updates);
  await todo.save();

  return Response.json(todo);
}

// DELETE /api/todos  body: { id }
export async function DELETE(req) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();

  const { id } = await req.json();
  if (!id) return Response.json({ error: "id is required" }, { status: 400 });

  await Todo.findByIdAndDelete(id);
  return Response.json({ success: true });
}
