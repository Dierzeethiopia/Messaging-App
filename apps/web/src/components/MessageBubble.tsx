import React from "react";

const MessageBubble = ({ text, isOwn }: { text: string; isOwn: boolean }) => {
  return (
    <div
      style={{
        alignSelf: isOwn ? "flex-end" : "flex-start",
        background: isOwn ? "#DCF8C6" : "#E6E6E6",
        borderRadius: 12,
        padding: 8,
        margin: 4,
        maxWidth: "70%",
      }}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
