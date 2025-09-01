// src/pages/Chat.tsx
import React, { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      text: input,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
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
