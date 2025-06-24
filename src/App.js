import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [interests, setInterests] = useState("");
  const [budget, setBudget] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const getRecommendations = async () => {
    setLoading(true);
    setRecommendations("");
    try {
      const res = await axios.post(
        "https://ai-recomendation-backend-1.onrender.com/recommend", 
        {
          interests: interests.split(",").map((i) => i.trim()),
          budget: parseFloat(budget),
        }
      );
      setRecommendations(res.data.recommendations);
    } catch (err) {
      setRecommendations("⚠️ Error fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        <div className="header">
          <span className="icon">🪄</span>
          <h1>AI Product Recommender</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "💡" : "🌙"}
          </button>
        </div>

        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Enter interests (e.g., tech, wallet)"
        />
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter budget"
          type="number"
        />
        <button onClick={getRecommendations} disabled={loading}>
          🎯 {loading ? "Loading..." : "Get Recommendations"}
        </button>

        {recommendations && (
          <div className="recommendation-box fade-in">
            <h2>🔍 Recommendations:</h2>
            <pre>{recommendations}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
