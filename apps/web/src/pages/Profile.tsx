// src/pages/Profile.tsx
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>👤 Profile</h2>
      <p>This is your profile page. (Coming soon: update display name, email, etc.)</p>

      <Link to="/" style={{ display: "inline-block", marginTop: "1rem" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default Profile;
