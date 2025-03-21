import { useEffect, useMemo, useState } from "react";

import "./App.css";
import WaterGlass from "./components/WaterGlass";
import { getDatabase } from "./storage/Database";

function App() {
  const [totalWater, setTotalWater] = useState(0);
  const MAX_CAPACITY = 3000; // 3 liters in milliliters
  const db = useMemo(() => getDatabase(), []);

  useEffect(() => {
    // Load initial value from storage
    setTotalWater(db.getValue());
  }, [db]);

  const addWater = (amount: number) => {
    const newTotal = Math.min(MAX_CAPACITY, totalWater + amount);
    setTotalWater(newTotal);
    db.setValue(newTotal);
  };

  const resetWater = () => {
    setTotalWater(0);
    db.reset();
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
