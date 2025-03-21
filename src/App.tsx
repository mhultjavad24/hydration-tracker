import { useState } from "react";

import "./App.css";
import WaterGlass from "./components/WaterGlass";

function App() {
  const [totalWater, setTotalWater] = useState(0);
  const MAX_CAPACITY = 3000; // 3 liters in milliliters

  const addWater = (amount: number) => {
    setTotalWater(prev => Math.min(MAX_CAPACITY, prev + amount));
  };

  const resetWater = () => {
    setTotalWater(0);
  };

  const fillPercentage = (totalWater / MAX_CAPACITY) * 100;

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

      <div style={{ textAlign: "center" }}>
        <p>
          Total:
          {totalWater}
          ml /
          {MAX_CAPACITY}
          ml
        </p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button type="button" onClick={() => addWater(330)}>Add 33cl</button>
          <button type="button" onClick={() => addWater(500)}>Add 50cl</button>
          <button type="button" onClick={() => addWater(1000)}>Add 100cl</button>
        </div>
        <button type="button" onClick={resetWater}>Reset</button>
      </div>
    </div>
  );
}

export default App;
