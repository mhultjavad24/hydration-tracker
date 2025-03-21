import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WaterGlass from "./WaterGlass";

describe("waterGlass", () => {
  it("renders with default dimensions", () => {
    render(<WaterGlass fillPercentage={50} />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
    expect(svg).toHaveAttribute("height", "300");
  });

  it("renders with custom dimensions", () => {
    render(<WaterGlass fillPercentage={50} width={400} height={600} />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "400");
    expect(svg).toHaveAttribute("height", "600");
  });

  it("displays correct fill percentage", () => {
    render(<WaterGlass fillPercentage={75} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("clamps fill percentage to 0-100 range", () => {
    render(<WaterGlass fillPercentage={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    render(<WaterGlass fillPercentage={-25} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders water fill at correct height", () => {
    render(<WaterGlass fillPercentage={50} />);
    const waterFill = document.querySelector("rect[fill=\"url(#waterFill)\"]");
    expect(waterFill).toBeInTheDocument();
    // For 50% fill, the height should be 35% of total height (50% of the available 70%)
    expect(waterFill).toHaveAttribute("height", String(300 * 0.7 * 0.5));
  });
});
