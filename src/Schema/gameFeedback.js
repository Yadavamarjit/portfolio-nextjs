import mongoose from "mongoose";

const GameFeedbackSchema = new mongoose.Schema({
  name: { type: String, default: "Anonymous Runner" },
  email: { type: String, default: "" },
  feedback: { type: String, required: true },
  game: { type: String, default: "BhaagDipke" },
  distance: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  ip: { type: String },
  city: { type: String },
  region: { type: String },
  country_name: { type: String },
  device: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.game_feedbacks ||
  mongoose.model("game_feedbacks", GameFeedbackSchema);
