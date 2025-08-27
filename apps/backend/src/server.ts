import dotenv from "dotenv";
dotenv.config(); // ✅ Load env variables early

import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { connectToMongo } from "./db";
import { User } from "./models/User";
import authRoutes from "./routes/auth";

// ✅ Create express app
const app = express();

// ✅ Middleware setup
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);

app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

app.get("/test-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Setup HTTP + Socket.io server
const port = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, {
  path: process.env.SOCKET_PATH || "/socket.io",
  cors: {
    origin: [process.env.CORS_ORIGIN_WEB!, process.env.CORS_ORIGIN_MOBILE!],
    credentials: true,
  },
});

// ✅ Memory map to track online users (socket.id => userId)
const onlineUsers = new Map<string, string>();

// ✅ Socket connection logic
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // ✅ When user joins, associate socket with userId
  socket.on("user:joined", (userId: string) => {
    onlineUsers.set(socket.id, userId);
    console.log(`🟢 User ${userId} joined (socket ${socket.id})`);

    // Broadcast updated list of online users
    io.emit("users:online", Array.from(onlineUsers.values()));
  });

  // ✅ When user sends a message
  socket.on("message:new", ({ toUserId, message }) => {
    console.log("📨 New message received", message);

    // Send message to recipient if they are online
    for (const [socketId, userId] of onlineUsers.entries()) {
      if (userId === toUserId) {
        io.to(socketId).emit("message:incoming", message);
      }
    }
  });

  // ✅ On disconnect
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);

    // Remove user from online list
    onlineUsers.delete(socket.id);

    // Broadcast updated online users list
    io.emit("users:online", Array.from(onlineUsers.values()));
  });
});

// ✅ Connect DB and start server
connectToMongo();
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
