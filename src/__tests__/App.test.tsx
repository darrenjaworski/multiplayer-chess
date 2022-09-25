import { render, screen } from "@testing-library/react";
import App from "../App";

describe("app", () => {
  it("renders a game", () => {
    render(<App />);
    const game = screen.getByTestId("game");
    expect(game).toBeInTheDocument();
  });
});
