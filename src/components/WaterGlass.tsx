import React from "react";

type WaterGlassProps = {
  // Fill percentage (0 to 100)
  fillPercentage: number;
  // Optional width and height for the SVG
  width?: number;
  height?: number;
};

const WaterGlass: React.FC<WaterGlassProps> = ({
  fillPercentage,
  width = 200,
  height = 300,
}) => {
  // Ensure fillPercentage is between 0 and 100
  const normalizedFillPercentage = Math.min(100, Math.max(0, fillPercentage));

  // Calculate the height of the water based on the fill percentage
  // We leave some space at the bottom (10%) and top (10%) of the glass
  const glassInnerHeight = height * 0.8;
  const waterHeight = (glassInnerHeight * normalizedFillPercentage) / 100;
  const waterY = height - waterHeight - height * 0.1; // Position from the bottom with offset

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Glass outline */}
        <path
          d={`
            M ${width * 0.2} ${height * 0.1}
            L ${width * 0.15} ${height * 0.9}
            L ${width * 0.85} ${height * 0.9}
            L ${width * 0.8} ${height * 0.1}
            Z
          `}
          stroke="#666"
          strokeWidth="2"
          fill="none"
        />

        {/* Glass base */}
        <rect
          x={width * 0.15 - 10}
          y={height * 0.9}
          width={width * 0.7 + 20}
          height={height * 0.05}
          rx="2"
          ry="2"
          fill="#888"
        />

        {/* Water */}
        {normalizedFillPercentage > 0 && (
          <path
            d={`
              M ${width * 0.15} ${height * 0.9}
              L ${width * 0.85} ${height * 0.9}
              L ${width * 0.85 - (width * 0.05 * normalizedFillPercentage / 100)} ${waterY}
              L ${width * 0.15 + (width * 0.05 * normalizedFillPercentage / 100)} ${waterY}
              Z
            `}
            fill="rgba(52, 152, 219, 0.8)"
            stroke="none"
          />
        )}

        {/* Glass reflection */}
        <path
          d={`
            M ${width * 0.25} ${height * 0.15}
            L ${width * 0.22} ${height * 0.7}
            L ${width * 0.35} ${height * 0.7}
            L ${width * 0.38} ${height * 0.15}
            Z
          `}
          fill="rgba(255, 255, 255, 0.1)"
          stroke="none"
        />

        {/* Water percentage text */}
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#333"
          fontSize={width * 0.1}
          fontWeight="bold"
        >
          {Math.round(normalizedFillPercentage)}
          %
        </text>
      </svg>
    </div>
  );
};

export default WaterGlass;
