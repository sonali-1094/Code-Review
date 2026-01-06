import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!code.trim()) {
      setReview("⚠️ Please enter some code before submitting.")
      return
    }

    setLoading(true)
    try {
      // ✅ Matches your backend running on port 3000
      const response = await axios.post('http://localhost:3000/ai/get-review', { code }, {
        headers: { "Content-Type": "application/json" }
      })
      setReview(response.data.review || "✅ No issues found!")
    } catch (error) {
      console.error("Error fetching review:", error.response?.data || error.message)
      setReview("❌ Failed to fetch review. Please check your server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="left">
        <h2>Code Editor</h2>
        <ul className="guidelines">
          <li>Paste valid JavaScript, Python, or Java code.</li>
          <li>Click "Submit" to get AI feedback.</li>
          <li>Use clear variable names for better readability.</li>
        </ul>
        <textarea 
          className="code" 
          placeholder="Paste or write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <button className="review-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>
      
      <div className="right">
        <h2>Review Output</h2>
        <div className="review">
          {review ? (
            <pre>{review}</pre>
          ) : (
            <p>Your code review will appear here after submission...</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
