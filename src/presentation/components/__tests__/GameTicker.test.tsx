import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStoreWithHistory } from "../../../test-config/fakeStores";
import { renderComponentWithStore } from "../../../test-config/renderComponentWith";
import { GameTicker } from "../GameTicker";

describe("GameTicker", () => {
  it("displays message when no pgn for the game", () => {
    renderComponentWithStore(<GameTicker />);
    const PGNTicker = screen.getByTestId("pgn-ticker");

    expect(PGNTicker.innerHTML).toEqual(
      "pgn will display here when you start playing"
    );
  });

  it("renders pgn when game has history", () => {
    const storeWithHistory = createStoreWithHistory();
    renderComponentWithStore(<GameTicker />, storeWithHistory);
    const PGNTicker = screen.getByTestId("pgn-ticker");

    expect(PGNTicker.innerHTML).toEqual(
      "1. Nf3 Nf6 2. g4 Nxg4 3. Ne5 d6 4. Nxf7 Kxf7 5. f3 Nxh2 6. Rxh2"
    );
  });

  it("has disabled show full history button when no game history", () => {
    renderComponentWithStore(<GameTicker />);
    const showHistoryButton = screen.getByTitle("show game history details");

    expect(showHistoryButton).toHaveAttribute("disabled");
  });

  it("displays modal when show full history is clicked", () => {
    const storeWithHistory = createStoreWithHistory();
    renderComponentWithStore(<GameTicker />, storeWithHistory);

    const showHistoryButton = screen.getByTitle("show game history details");

    expect(showHistoryButton).not.toHaveAttribute("disabled");

    userEvent.click(showHistoryButton);
    const modalContent = screen.getByTestId("full-history-modal");
    expect(modalContent).toBeInTheDocument();
  });
});
