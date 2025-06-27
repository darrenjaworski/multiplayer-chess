import { ThemeProvider } from "@emotion/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { theme } from "../../theme/theme";
import { LocalGamePlay } from "../LocalGamePlay";
import { LocalGameSetup } from "../LocalGameSetup";

function renderLocalGameSetup() {
  render(
    <ThemeProvider theme={theme.dark}>
      <MemoryRouter initialEntries={["/game/local"]}>
        <Routes>
          <Route path="/game/local" element={<LocalGameSetup />} />
          <Route path="/game/local/play" element={<LocalGamePlay />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe("LocalGameSetup", () => {
  it("shows two name inputs and a start button", () => {
    renderLocalGameSetup();
    expect(screen.getByLabelText(/white player name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/black player name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start game/i })
    ).toBeInTheDocument();
  });

  it("navigates to the local game with player names when started", async () => {
    renderLocalGameSetup();
    const whiteInput = screen.getByLabelText(/white player name/i);
    const blackInput = screen.getByLabelText(/black player name/i);
    const startButton = screen.getByRole("button", { name: /start game/i });

    await userEvent.type(whiteInput, "Alice");
    await userEvent.type(blackInput, "Bob");
    await userEvent.click(startButton);

    expect(await screen.findByText(/local game/i)).toBeInTheDocument();
    expect(screen.getByText(/white: alice/i)).toBeInTheDocument();
    expect(screen.getByText(/black: bob/i)).toBeInTheDocument();
  });

  it("centers the form and uses the styled Button", () => {
    renderLocalGameSetup();
    const form = screen.getByTestId("local-game-setup-form");
    // Check for centering style or class
    const formStyle = window.getComputedStyle(form);
    expect(formStyle.display).toBe("flex");
    expect(formStyle.flexDirection).toBe("column");
    expect(formStyle.alignItems).toBe("center");

    // Check that the Start button uses the custom Button styles
    const startButton = screen.getByRole("button", { name: /start game/i });
    const buttonStyle = window.getComputedStyle(startButton);
    expect(buttonStyle.padding).toMatch(/0.75.*1/);
    expect(buttonStyle.border).toMatch(/solid/);
  });
});
