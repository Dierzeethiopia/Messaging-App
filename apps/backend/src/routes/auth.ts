
// src/routes/auth.ts
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ POST /auth/signup
router.post("/signup", async (req, res) => {
  const { email, displayName, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "User already exists" });

    const user = new User({ email, displayName, password });
    await user.save();

    res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});


// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, email: user.email, displayName: user.displayName } });

  } catch (err) {
    console.error("❌ Login error:", err); // 👈 ADD THIS LINE
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ GET /auth/me
// router.get("/me", authenticateJWT, async (req: any, res) => {
//   res.json({ user: req.userID });
// });
router.get("/me", authenticateJWT, async (req: any, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

export default router;
