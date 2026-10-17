import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  notes: { type: String, default: "" },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  category: {
    type: String,
    enum: ["work", "fitness", "learning", "personal", "other"],
    default: "work",
  },
  dueDate: { type: Date, default: null },
  done: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  // Whether this todo should be included in AI embeddings
  syncToAI: { type: Boolean, default: true },
});

// Auto-set completedAt when done flips to true
TodoSchema.pre("save", function (next) {
  if (this.isModified("done")) {
    this.completedAt = this.done ? new Date() : null;
  }
  next();
});

export default mongoose.models.todos || mongoose.model("todos", TodoSchema);
