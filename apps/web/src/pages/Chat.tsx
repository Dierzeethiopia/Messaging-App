// src/pages/Chat.tsx
import React, { useState, useRef, useEffect } from "react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-[#ece5dd]">
      {/* Header */}
      <div className="p-4 bg-[#075e54] text-white text-lg font-semibold shadow-sm">
        💬 WhatsApp Clone
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 bg-chat-pattern">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="max-w-[75%] ml-auto bg-[#dcf8c6] text-gray-900 rounded-lg px-4 py-2 shadow text-sm transition hover:brightness-95"
          >
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#f0f0f0] border-t flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-full text-sm focus:outline-none border border-gray-300 bg-white shadow-sm"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-[#25d366] text-white rounded-full hover:bg-[#20c054] transition font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
