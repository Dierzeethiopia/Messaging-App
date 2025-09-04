// src/models/Message.ts

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ciphertext: { type: String, required: true },
  iv: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

messageSchema.index({ recipientId: 1, createdAt: -1 });

export const Message = mongoose.model("Message", messageSchema);

