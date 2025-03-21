import React from "react";

type WaterGlassProps = {
  fillPercentage: number;
  width?: number;
  height?: number;
};

const WaterGlass: React.FC<WaterGlassProps> = ({
  fillPercentage,
  width = 200,
  height = 300,
}) => {
  const normalizedFillPercentage = Math.min(100, Math.max(0, fillPercentage));

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="waterContainer" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#e1f5fe", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "#b3e5fc", stopOpacity: 0.5 }} />
          </linearGradient>

          <linearGradient id="waterFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#0288d1", stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: "#039be5", stopOpacity: 0.8 }} />
          </linearGradient>

          <filter id="containerShadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Container background */}
        <rect
          x={width * 0.1}
          y={height * 0.1}
          width={width * 0.8}
          height={height * 0.8}
          rx={20}
          fill="url(#waterContainer)"
          stroke="#81d4fa"
          strokeWidth="2"
          filter="url(#containerShadow)"
        />

        {/* Water fill */}
        <rect
          x={width * 0.15}
          y={height * 0.15 + (height * 0.7 * (100 - normalizedFillPercentage) / 100)}
          width={width * 0.7}
          height={height * 0.7 * normalizedFillPercentage / 100}
          fill="url(#waterFill)"
          style={{
            transition: "y 0.3s ease-out, height 0.3s ease-out",
          }}
        />

        {/* Percentage text */}
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#01579b"
          fontSize={width * 0.15}
          fontWeight="bold"
          style={{
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.5)",
          }}
        >
          {Math.round(normalizedFillPercentage)}
          %
        </text>
      </svg>
    </div>
  );
};

export default WaterGlass;
