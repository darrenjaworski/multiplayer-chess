import { screen } from "@testing-library/react";
import { initialState } from "../../../state-management/slices/game";
import { renderComponentWithStore } from "../../../test-config/renderComponentWithStore";
import { Game } from "../Game";

describe("game screen", () => {
  it("shows player names on screen", () => {
    renderComponentWithStore(<Game />);

    const players = screen.getAllByTestId("player");

    const playerOne = players[0];
    const playerTwo = players[1];

    expect(playerOne).toBeInTheDocument();
    expect(playerTwo).toBeInTheDocument();
  });

  it("shows the player names", () => {
    renderComponentWithStore(<Game />);

    const players = screen.getAllByTestId("player-name");
    const p1Name = players[0];
    const p2Name = players[1];

    expect(p1Name).toHaveTextContent(initialState.players[0].username);
    expect(p2Name).toHaveTextContent(initialState.players[1].username);
  });

  it("shows the player elo rankings", () => {
    renderComponentWithStore(<Game />);

    const players = screen.getAllByTestId("player-ranking");
    const p1Elo = players[0];
    const p2Elo = players[1];

    expect(p1Elo).toHaveTextContent(String(initialState.players[0].eloScore));
    expect(p2Elo).toHaveTextContent(String(initialState.players[1].eloScore));
  });
});
