// src/components/MessageInput.tsx
import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const MessageInput = () => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    const secret = "mysecretkey"; // 🔐 Replace this with per-user key later
    const ciphertext = CryptoJS.AES.encrypt(text, secret).toString();

    await axios.post("http://localhost:4000/messages", {
      senderId: "68ab6d2d6a32ff51249813ab", // Replace with real userId (from JWT)
      recipientId: "some-recipient-id", // Replace with real recipient
      ciphertext,
    });

    setText("");
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t bg-white">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
