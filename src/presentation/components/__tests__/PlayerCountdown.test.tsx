import { screen } from "@testing-library/react";
import { renderComponentWithStore } from "../../../test-config/renderComponentWithStore";
import { getMinSec, PlayerCountdown } from "../PlayerCountdown";

describe("PlayerCountddown", () => {
  describe("getMinSec", () => {
    it("will min and seconds XX:XX", () => {
      const expectedOutput = "5:00";
      const actualOutput = getMinSec(300);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("will omit min and : when under 1 min left", () => {
      const expectedOutput = "59";
      const actualOutput = getMinSec(59);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("will show 0X when below 10 seconds", () => {
      const expectedOutput = "09";
      const actualOutput = getMinSec(9);
      expect(actualOutput).toEqual(expectedOutput);
    });

    it("will show nothing when an invalid number is attempted to be formatted", () => {
      const expectedOutput = "";
      const actualOutput = getMinSec(-10);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  it("shows clock with correct time and color when it is players turn", () => {
    const color = "w";
    renderComponentWithStore(
      <PlayerCountdown startTime={100} turn={true} color={color} />
    );
    const timeRemaining = screen.getByTestId(
      `player-${color}-countdown-remaining`
    );
    expect(timeRemaining).toHaveTextContent("1:40");

    const countdownContainer = screen.getByTestId(`player-${color}-countdown`);
    expect(countdownContainer).toHaveStyle({ color: "red" });
  });

  it("shows clock with correct time and color when it is not players turn", () => {
    const color = "w";
    renderComponentWithStore(
      <PlayerCountdown startTime={300} turn={false} color={color} />
    );
    const timeRemaining = screen.getByTestId(
      `player-${color}-countdown-remaining`
    );
    expect(timeRemaining).toHaveTextContent("5:00");

    const countdownContainer = screen.getByTestId(`player-${color}-countdown`);
    expect(countdownContainer).toHaveStyle({ color: "steelblue" });
  });
});
