// src/pages/Home.tsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">🔐 Encrypted Messenger</h1>
      <p className="text-lg text-gray-700 mb-4">Welcome to your secure messaging dashboard.</p>

      <div className="space-y-4">
        <Link
          to="/chat"
          className="block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-center"
        >
          💬 Go to Chat
        </Link>
        <Link
          to="/profile"
          className="block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-center"
        >
          👤 Profile
        </Link>
        <Link
          to="/settings"
          className="block px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 text-center"
        >
          ⚙️ Settings
        </Link>
      </div>
    </div>
  );
}

export default Home;
