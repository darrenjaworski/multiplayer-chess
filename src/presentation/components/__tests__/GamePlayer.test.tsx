import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createStoreWithBlackTurn,
  createStoreWithHistory,
} from "../../../test-config/fakeStores";
import { renderComponentWithStore } from "../../../test-config/renderComponentWithStore";
import { GamePlayer } from "../GamePlayer";
import {undoMove} from '../../../state-management/slices/game';

describe("GamePlayer", () => {
  it("shows icon when is players turn", () => {
    const player = { username: "darrenjaws", eloScore: 10 };
    const piecesColor = "b";
    const blacksTurnStore = createStoreWithBlackTurn();

    renderComponentWithStore(
      <GamePlayer piecesColor={piecesColor} player={player} />,
      blacksTurnStore
    );
    const playerName = screen.getByTestId("player-turn-indicator");
    expect(playerName).toBeInTheDocument();
  });

  it("should not show icon when players turn is not active", () => {
    const player = { username: "darrenjaws", eloScore: 10 };
    const piecesColor = "b";

    renderComponentWithStore(
      <GamePlayer piecesColor={piecesColor} player={player} />
    );
    const playerName = screen.queryByText("player-turn-indicator");
    expect(playerName).not.toBeInTheDocument();
  });

  it("should trigger an undo move when available", () => {
    const player = { username: "darrenjaws", eloScore: 10 };
    const piecesColor = "w";

    const storeWithHistory = createStoreWithHistory();

    renderComponentWithStore(
      <GamePlayer piecesColor={piecesColor} player={player} />,
      storeWithHistory
    );

    const playerUndo = screen.getByTestId(`${piecesColor}-undo`);

    expect(playerUndo).not.toHaveAttribute("disabled");
    userEvent.click(playerUndo);
    expect(storeWithHistory.getActions()).toEqual([undoMove()]);
  });

  it("undo is disabled when it is players turn", () => {
    const player = { username: "darrenjaws", eloScore: 10 };
    const piecesColor = "b";
    const blacksTurnStore = createStoreWithBlackTurn();

    renderComponentWithStore(
      <GamePlayer piecesColor={piecesColor} player={player} />,
      blacksTurnStore
    );

    const playerUndo = screen.getByTestId(`${piecesColor}-undo`);
    expect(playerUndo).toHaveAttribute("disabled");
  });
});
