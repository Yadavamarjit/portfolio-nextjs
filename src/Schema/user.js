import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  messagesId: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],
  joinedOn: { type: Date, default: Date.now },
  device: { type: String },
  city: { type: String },
  region: { type: String },
  country_name: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
});

export default mongoose.models.users_v2 ||
  mongoose.model("users_v2", UserSchema);
