// src/pages/Home.tsx
import { Link } from "react-router-dom";
import "../styles/Chat.css";

function Home() {
  return (
    <div>
      <div className="dashboard-header">
        <span className="dashboard-title">🔐 Encrypted Messenger</span>
        <nav className="dashboard-nav">
          <Link to="/profile" className="dashboard-nav-btn">
            👤 Profile
          </Link>
          <Link to="/settings" className="dashboard-nav-btn">
            ⚙️ Settings
          </Link>
        </nav>
      </div>
      <div className="dashboard-main-content">
        <div className="dashboard-user-card">
          <div className="dashboard-avatar">👤</div>
          <div>
            <div className="dashboard-username">Welcome, User!</div>
            <div className="dashboard-status">
              Your messages are end-to-end encrypted.
            </div>
          </div>
        </div>
        <div className="dashboard-center-actions">
          <Link
            to="/chat"
            className="dashboard-nav-btn dashboard-center-btn active"
          >
            💬 Go to Chat
          </Link>
        </div>
        <div className="dashboard-tips">
          <h3>Quick Tips</h3>
          <ul>
            <li>🔒 All your messages are private and secure.</li>
            <li>🖼️ Share images and files with your contacts.</li>
            <li>⚡ Enjoy real-time messaging and notifications.</li>
          </ul>
        </div>
      </div>
      <footer className="dashboard-footer">
        &copy; {new Date().getFullYear()} Encrypted Messenger. All rights
        reserved.
      </footer>
    </div>
  );
}

export default Home;
