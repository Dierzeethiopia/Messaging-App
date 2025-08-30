import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import axios from "axios";

const ChatWindow = () => {
  const [messages, setMessages] = useState<
    { text: string; isOwn: boolean; _id: string }[]
  >([]);

  useEffect(() => {
    // You can update this with real message fetch
    axios.get("http://localhost:4000/messages?chatId=test").then((res) => {
      const msgs = res.data.map((msg: any) => ({
        text: msg.ciphertext, // You'll decrypt later
        isOwn: msg.senderId === "68ab6d2d6a32ff51249813ab", // use your real user id here
        _id: msg._id,
      }));
      setMessages(msgs);
    });
  }, []);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "scroll",
        padding: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((msg) => (
        <MessageBubble key={msg._id} text={msg.text} isOwn={msg.isOwn} />
      ))}
    </div>
  );
};

export default ChatWindow;
