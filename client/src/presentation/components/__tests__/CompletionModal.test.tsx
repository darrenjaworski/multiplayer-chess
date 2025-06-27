import { screen } from "@testing-library/react";
import { Chess } from "chess.js";
import { describe, expect, it } from "vitest";
import {
  createStoreWithForfeit,
  createStoreWithGameState,
} from "../../../test-config/fakeStores";
import { renderComponentWithStore } from "../../../test-config/renderComponentWith";
import { CompletionModal } from "../CompletionModal";

describe("CompletionModal", () => {
  it("displays check mate when in check mate", () => {
    const game = new Chess();
    const history = [
      {
        color: "w",
        piece: "p",
        from: "g2",
        to: "g4",
        san: "g4",
        flags: "b",
      },
      {
        color: "b",
        piece: "p",
        from: "a7",
        to: "a6",
        san: "a6",
        flags: "n",
      },
      {
        color: "w",
        piece: "p",
        from: "f2",
        to: "f3",
        san: "f3",
        flags: "n",
      },
      {
        color: "b",
        piece: "p",
        from: "e7",
        to: "e5",
        san: "e5",
        flags: "b",
      },
      {
        color: "w",
        piece: "p",
        from: "a2",
        to: "a3",
        san: "a3",
        flags: "n",
      },
      {
        color: "b",
        piece: "q",
        from: "d8",
        to: "h4",
        san: "Qh4#",
        flags: "n",
      },
    ];

    history.forEach((move) => {
      game.move(move.san);
    });

    const store = createStoreWithGameState(game);

    renderComponentWithStore(<CompletionModal isOpen={true} />, store);

    const whoLostText = screen.getByTestId("endgame-text");
    expect(whoLostText).toHaveTextContent("Check mate foo");
  });

  it("displays forfeit when someone forfeited", () => {
    const store = createStoreWithForfeit();

    renderComponentWithStore(<CompletionModal isOpen={true} />, store);

    const whoQuitText = screen.getByTestId("endgame-text");
    expect(whoQuitText).toHaveTextContent("foo has forfeited");
  });
});
