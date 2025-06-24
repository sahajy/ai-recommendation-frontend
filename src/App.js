import React, { useState } from "react";
import axios from "axios";
import { FaRegLightbulb, FaLightbulb, FaMagic, FaSpinner } from "react-icons/fa";
import "./App.css";

function App() {
  const [interests, setInterests] = useState("");
  const [budget, setBudget] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const getRecommendations = async () => {
    setLoading(true);
    setRecommendations("");
    setShowResult(false); // Hide result while loading

    try {
      const res = await axios.post("http://127.0.0.1:8000/recommend", {
        interests: interests.split(",").map((s) => s.trim()),
        budget: parseFloat(budget),
      });
      setRecommendations(res.data.recommendations);
      setShowResult(true); // Trigger animation
    } catch (err) {
      setRecommendations("⚠️ Error fetching recommendations.");
      setShowResult(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <div className="App-card">
        <div className="App-header-bar">
          <h1 className="App-title">
            <FaMagic /> AI Product Recommender
          </h1>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaLightbulb /> : <FaRegLightbulb />}
          </button>
        </div>

        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Enter interests (e.g., sport, fashion)"
          className="App-input"
        />

        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter your budget"
          type="number"
          className="App-input"
        />

        <button className="App-button" onClick={getRecommendations} disabled={loading}>
          {loading ? <FaSpinner className="spin" /> : "🎯 Get Recommendations"}
        </button>

        {showResult && (
          <div className={`App-result animate-in`}>
            <h3>🔍 Recommendations:</h3>
            <pre>{recommendations}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
