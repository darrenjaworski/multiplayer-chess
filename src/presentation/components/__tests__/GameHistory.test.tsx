import { screen } from "@testing-library/react";
import { createStoreWithHistory } from "../../../test-config/fakeStores";
import { renderComponentWithStore } from "../../../test-config/renderComponentWithStore";
import { GameHistory } from "../GameHistory";

describe("GameHistory", () => {
  it("displays history as pgn", () => {
    const storeWithHistory = createStoreWithHistory();
    renderComponentWithStore(<GameHistory />, storeWithHistory);

    const pgn = screen.getByTestId("game-history-pgn");

    expect(pgn).toHaveTextContent(
      "1. Nf3 Nf6 2. g4 Nxg4 3. Ne5 d6 4. Nxf7 Kxf7 5. f3 Nxh2 6. Rxh2"
    );
  });

  it("displays moves history", () => {
    const storeWithHistory = createStoreWithHistory();
    renderComponentWithStore(<GameHistory />, storeWithHistory);

    const moves = screen.queryAllByTestId(/game-moves-history/i);

    expect(moves.length).toEqual(11);
    expect(moves[0].innerHTML).toEqual("white - knight - g1 =&gt; f3 (Nf3)");
    expect(moves[moves.length - 1].innerHTML).toEqual(
      "white - rook takes knight - h1 =&gt; h2 (Rxh2)"
    );
  });

  it("displays fen", () => {
    const storeWithHistory = createStoreWithHistory();
    renderComponentWithStore(<GameHistory />, storeWithHistory);

    const fen = screen.getByTestId("game-history-fen");

    expect(fen).toHaveTextContent(
      "rnbq1b1r/ppp1pkpp/3p4/8/8/5P2/PPPPP2R/RNBQKB2 b Q - 0 6"
    );
  });
});
