import { render, screen } from "@testing-library/react";
import { Game } from "../Game";

describe("game screen", () => {
  it("shows player names on screen", () => {
    render(<Game />);

    const playerOne = screen.getByTestId("top-player");
    const playerTwo = screen.getByTestId("bottom-player");

    expect(playerOne).toBeInTheDocument();
    expect(playerTwo).toBeInTheDocument();
  });
});
