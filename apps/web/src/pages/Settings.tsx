// src/pages/Settings.tsx
import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>⚙️ Settings</h2>
      <p>Here you can manage app preferences. (Coming soon: dark mode, notifications, etc.)</p>

      <Link to="/" style={{ display: "inline-block", marginTop: "1rem" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default Settings;
