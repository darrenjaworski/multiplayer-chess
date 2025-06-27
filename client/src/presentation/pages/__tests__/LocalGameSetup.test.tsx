import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LocalGamePlay } from "../LocalGamePlay";
import { LocalGameSetup } from "../LocalGameSetup";

function renderLocalGameSetup() {
  render(
    <MemoryRouter initialEntries={["/game/local"]}>
      <Routes>
        <Route path="/game/local" element={<LocalGameSetup />} />
        <Route path="/game/local/play" element={<LocalGamePlay />} />
      </Routes>
    </MemoryRouter>
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
});
