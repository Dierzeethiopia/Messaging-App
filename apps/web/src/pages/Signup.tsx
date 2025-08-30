// src/pages/Signup.tsx
import { useState } from "react";
import axios from "../services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("/auth/signup", {
        email,
        displayName,
        password,
      });
      alert("✅ Signup successful!");
      localStorage.setItem("token", res.data.token); // Save token if returned
    } catch (err: any) {
      alert("❌ Signup failed: " + err.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Name" onChange={(e) => setDisplayName(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
