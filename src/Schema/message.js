import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users_v2",
    required: true,
  },
  userMessage: { type: String },
  systemResponse: { type: String },
});

export default mongoose.models.messages ||
  mongoose.model("messages", MessageSchema);
