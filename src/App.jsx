import React, { useState } from "react";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [adviceCount, setAdviceCount] = useState(0);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
      setAdviceCount(adviceCount + 1);
    } catch (error) {
      setAdvice("Could not fetch advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advice-app">
      <div className="advice-card">
        <h2 className="advice-title">Advice Generator</h2>
        <p className="advice-counter">Advice count: {adviceCount}</p>
        <div className="advice-text-container">
          {loading ? (
            <div className="spinner">Loading...</div>
          ) : (
            <p className="advice-text">
              {advice || "Click the button to get advice!"}
            </p>
          )}
        </div>
        <button onClick={fetchAdvice} className="advice-button">New Advice</button>
      </div>
    </div>
  );
}

export default App;
