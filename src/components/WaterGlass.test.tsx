import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WaterGlass from "./WaterGlass";

describe("waterGlass", () => {
  it("renders SVG with default dimensions of 200x300", () => {
    render(<WaterGlass fillPercentage={50} />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
    expect(svg).toHaveAttribute("height", "300");
  });

  it("renders SVG with custom dimensions when provided", () => {
    render(<WaterGlass fillPercentage={50} width={400} height={600} />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "400");
    expect(svg).toHaveAttribute("height", "600");
  });

  it("shows exact percentage in text label", () => {
    render(<WaterGlass fillPercentage={75} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("constrains fill percentage between 0 and 100", () => {
    render(<WaterGlass fillPercentage={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    render(<WaterGlass fillPercentage={-25} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("adjusts water fill height proportionally to fill percentage", () => {
    render(<WaterGlass fillPercentage={50} />);
    const waterFill = document.querySelector("rect[fill=\"url(#liquidGradient)\"]");
    expect(waterFill).toBeInTheDocument();
    expect(waterFill).toHaveAttribute("height", String(300 * 0.7 * 0.5));
  });
});
