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

  // Load messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/messages");
        const formattedMessages = res.data.map((msg: any) => ({
          text: msg.ciphertext, // Ideally decrypt here
          sender: msg.senderId === localStorage.getItem("userId") ? "me" : "other",
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));
        setMessages(formattedMessages);
      } catch (err) {
        console.error("Failed to fetch messages", err);
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
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      await axios.post("http://localhost:4000/messages", {
        senderId: localStorage.getItem("userId") || "123",
        recipientId: "some-recipient-id",
        ciphertext: input,
      });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="telegram-chat-container">
      {/* Sidebar */}
      <aside className="telegram-chat-sidebar">
        <div className="telegram-sidebar-header">Contacts</div>
        <ul className="telegram-chat-contacts">
          <li className="telegram-chat-contact active">John Doe</li>
          <li className="telegram-chat-contact">Alice Smith</li>
          <li className="telegram-chat-contact">Bob Johnson</li>
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="telegram-chat-main">
        <header className="telegram-chat-header">💬 Telegram Style Messenger</header>

        <div className="telegram-chat-box">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`telegram-chat-message ${msg.sender === "me" ? "telegram-chat-message-me" : "telegram-chat-message-other"}`}
            >
              <div className="telegram-chat-bubble">
                <p className="telegram-chat-text">{msg.text}</p>
                <span className="telegram-chat-timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="telegram-chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="telegram-chat-input"
          />
          <button onClick={handleSend} className="telegram-chat-send-btn">
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chat;
