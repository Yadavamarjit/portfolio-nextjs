import mongoose from "mongoose";

const GameVisitorSchema = new mongoose.Schema({
  game: { type: String, default: "BhaagDipke" },
  ip: { type: String },
  city: { type: String },
  region: { type: String },
  country_name: { type: String },
  country_code: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  device: { type: String },
  userAgent: { type: String },
  referrer: { type: String },
  screenResolution: { type: String },
  visitedAt: { type: Date, default: Date.now },
});

export default mongoose.models.game_visitors ||
  mongoose.model("game_visitors", GameVisitorSchema);
