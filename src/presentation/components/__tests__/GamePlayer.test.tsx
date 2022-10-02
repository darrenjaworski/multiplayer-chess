import { screen } from "@testing-library/react";
import { createStoreWithBlackTurn } from "../../../test-config/fakeStores";
import { renderComponentWithStore } from "../../../test-config/renderComponentWithStore";
import { GamePlayer } from "../GamePlayer";

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
});
