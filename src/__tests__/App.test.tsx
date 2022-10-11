import { render, screen } from "@testing-library/react";
import App from "../App";

describe("app", () => {
  it("renders a game", () => {
    render(<App />);
    const game = screen.getByTestId("start");
    expect(game).toBeInTheDocument();
  });
});

// TODO write some tests around the error boundary
