import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiBase = import.meta.env.VITE_API_BASE_URL || "";

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("⚠️ Please enter some code before submitting.");
      return;
    }

    setLoading(true);
    setError("");
    setReview("");

    try {
      const response = await axios.post(
        `${apiBase}/ai/get-review`,
        { text: code }, // MUST be 'text'
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      setReview(response.data.review || "✅ No issues found!");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      if (err.response?.data?.error) {
        setError(`❌ ${err.response.data.error}`);
      } else {
        setError("❌ Failed to fetch review. Please check your server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <div className="left">
        <h2>🧠 AI Code Reviewer</h2>

        <ul className="guidelines">
          <li>Paste JavaScript / Python / Java code</li>
          <li>Click Review to get AI feedback</li>
          <li>Write clean, readable code</li>
        </ul>

        <textarea
          className="code"
          placeholder="Paste or write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="review-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>

      <div className="right">
        <h2>📋 Review Output</h2>

        <div className="review">
          {loading && <p>⏳ AI is reviewing your code...</p>}
          {error && <p className="error">{error}</p>}
          {review && <pre>{review}</pre>}
          {!loading && !review && !error && (
            <p>Your AI review will appear here.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
