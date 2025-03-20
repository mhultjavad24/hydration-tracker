import { useState } from "react";

import "./App.css";
import WaterGlass from "./components/WaterGlass";

function App() {
  const [fillPercentage, setFillPercentage] = useState(65);

  return (
    <div
      className="container"
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>Hydration Tracker</h1>

      <WaterGlass fillPercentage={fillPercentage} />

      <div style={{ width: "80%", maxWidth: "300px" }}>
        <label htmlFor="fillSlider" style={{ display: "block", marginBottom: "10px" }}>
          Water Level:
          {" "}
          {fillPercentage}
          %
        </label>
        <input
          id="fillSlider"
          type="range"
          min="0"
          max="100"
          value={fillPercentage}
          onChange={e => setFillPercentage(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default App;
