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
  const glassContainerWidth = width * 0.8;
  const glassContainerHeight = height * 0.8;
  const glassContainerX = width * 0.1;
  const glassContainerY = height * 0.1;
  const waterFillWidth = width * 0.7;
  const waterFillMaxHeight = height * 0.7;
  const waterFillCurrentHeight = waterFillMaxHeight * normalizedFillPercentage / 100;
  const waterFillX = width * 0.15;
  const waterFillY = height * 0.15 + (waterFillMaxHeight * (100 - normalizedFillPercentage) / 100);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#e1f5fe", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "#b3e5fc", stopOpacity: 0.5 }} />
          </linearGradient>

          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#0288d1", stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: "#039be5", stopOpacity: 0.8 }} />
          </linearGradient>

          <filter id="glassReflection" height="130%">
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

        <rect
          x={glassContainerX}
          y={glassContainerY}
          width={glassContainerWidth}
          height={glassContainerHeight}
          rx={20}
          fill="url(#glassGradient)"
          stroke="#81d4fa"
          strokeWidth="2"
          filter="url(#glassReflection)"
        />

        <rect
          x={waterFillX}
          y={waterFillY}
          width={waterFillWidth}
          height={waterFillCurrentHeight}
          fill="url(#liquidGradient)"
          style={{
            transition: "y 0.3s ease-out, height 0.3s ease-out",
          }}
        />

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
