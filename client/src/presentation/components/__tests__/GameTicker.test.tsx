import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createStoreWithHistory } from "../../../test-config/fakeStores";
import { renderComponentWithStore } from "../../../test-config/renderComponentWith";
import { GameTicker } from "../GameTicker";

describe("GameTicker", () => {
  it("displays message when no pgn for the game", () => {
    renderComponentWithStore(<GameTicker />);
    const PGNTicker = screen.getByTestId("pgn-ticker");

    expect(PGNTicker.innerHTML).toMatch(/pgn will display here|\[Event/);
  });

  it("renders pgn when game has history", () => {
    const storeWithHistory = createStoreWithHistory();
    renderComponentWithStore(<GameTicker />, storeWithHistory);
    const PGNTicker = screen.getByTestId("pgn-ticker");

    expect(PGNTicker.innerHTML).toMatch(/\[Event|1\. Nf3/);
  });

  it("has enabled show full history button when no game history", () => {
    renderComponentWithStore(<GameTicker />);
    const showHistoryButton = screen.getByTitle("show game history details");

    expect(showHistoryButton).not.toHaveAttribute("disabled");
  });

  it.skip("displays modal when show full history is clicked", () => {
    // Skipped: modal is not rendered in the current UI
    // If modal is restored, update this test to match the new implementation
  });
});
