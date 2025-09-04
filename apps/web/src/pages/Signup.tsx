// src/pages/Chat.tsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/Chat.css";

interface Message {
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages from backend on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/messages");
        const fetchedMessages: Message[] = res.data.map((msg: any) => ({
          text: msg.ciphertext, // assuming decrypted already or encrypted if needed
          sender: msg.senderId === "me" ? "me" : "other", // adjust with actual userId
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(fetchedMessages);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      text: input,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Show instantly
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Send to backend
    try {
      await axios.post("http://localhost:4000/messages", {
        senderId: "me", // replace with actual user ID
        recipientId: "recipientId", // optional
        ciphertext: input, // optionally encrypt here
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="sidebar-header">Chats</div>
        <ul className="chat-contacts">
          <li className="chat-contact active">John Doe</li>
          <li className="chat-contact">Alice Smith</li>
          <li className="chat-contact">Bob Johnson</li>
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        <header className="chat-header">💬 Encrypted Messenger</header>

        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.sender === "me" ? "chat-message-me" : "chat-message-other"}`}
            >
              <div className="chat-bubble">
                <p className="chat-text">{msg.text}</p>
                <span className="chat-timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={handleSend} className="chat-send-btn">
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chat;
