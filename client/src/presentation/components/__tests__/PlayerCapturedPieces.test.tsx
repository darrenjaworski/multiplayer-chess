import { screen } from "@testing-library/react";
import type { Piece } from "chess.js";
import { describe, expect, it } from "vitest";
import { createStoreWithCapturedPieces } from "../../../test-config/fakeStores";
import { renderComponentWithStore } from "../../../test-config/renderComponentWith";
import { PlayerCapturedPieces } from "../PlayerCapturedPieces";

describe("PlayerCapturedPieces", () => {
  it("shows captured icons", () => {
    const piecesColor = "b";
    const captured: Piece[] = [
      { color: "b", type: "b" },
      { color: "b", type: "n" },
      { color: "w", type: "q" },
    ];
    const capturedPiecesStore = createStoreWithCapturedPieces(captured);

    renderComponentWithStore(
      <PlayerCapturedPieces piecesColor={piecesColor} />,
      capturedPiecesStore
    );

    const blackFirstCaptured = screen.getByTestId("b-0");
    const blackSecondCaptured = screen.getByTestId("b-1");

    expect(blackFirstCaptured).toBeInTheDocument();
    expect(blackSecondCaptured).toBeInTheDocument();
  });

  it("will not render when no captured pieces for player color", () => {
    const piecesColor = "w";
    const captured: Piece[] = [
      { color: "b", type: "b" },
      { color: "b", type: "n" },
    ];
    const capturedPiecesStore = createStoreWithCapturedPieces(captured);

    renderComponentWithStore(
      <PlayerCapturedPieces piecesColor={piecesColor} />,
      capturedPiecesStore
    );
    const nullElement = screen.queryByTestId(`${piecesColor}-captured-pieces`);
    expect(nullElement).not.toBeInTheDocument();
  });
});
