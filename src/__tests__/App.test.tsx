import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { theme } from "../presentation/theme/theme";

describe("app", () => {
  it("renders a game", () => {
    render(<App />);
    const game = screen.getByTestId("start");
    expect(game).toBeInTheDocument();
  });

  it("handles toggling of the theme", () => {
    render(<App />);

    const selector = screen.getByTestId("theme-selector");
    expect(screen.getByTestId("start-headline")).toHaveStyle({
      color: theme.dark.colors.text,
    });

    userEvent.click(selector);

    expect(screen.getByTestId("start-headline")).toHaveStyle({
      color: theme.light.colors.text,
    });
  });
});

// TODO write some tests around the error boundary
