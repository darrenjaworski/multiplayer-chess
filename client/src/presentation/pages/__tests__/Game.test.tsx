import { screen, within } from "@testing-library/react";
// @ts-ignore
import MockedSocket from "socket.io-mock";
import { describe, expect, it, vi } from "vitest";
import {
  Player,
  PlayerType,
  initialState,
} from "../../../state-management/slices/game";
import { createStoreWithPlayers } from "../../../test-config/fakeStores";
import { renderComponentWithStore } from "../../../test-config/renderComponentWith";
import { Game } from "../Game";

vi.mock("socket.io-client");
vi.mock("../../../providers/socket", () => {
  return {
    socket: new MockedSocket(),
  };
});

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
    const p1Name = players[1];
    const p2Name = players[0];

    expect(p1Name).toHaveTextContent(initialState.players[0].username);
    expect(p2Name).toHaveTextContent(initialState.players[1].username);
  });

  it("shows the player elo rankings", () => {
    renderComponentWithStore(<Game />);

    const players = screen.getAllByTestId("player-ranking");
    const p1Elo = players[1];
    const p2Elo = players[0];

    expect(p1Elo).toHaveTextContent(String(initialState.players[0].eloScore));
    expect(p2Elo).toHaveTextContent(String(initialState.players[1].eloScore));
  });

  it("shows the correct orientation of the board for the player", () => {
    const players: Player[] = [
      {
        username: "darren-b",
        eloScore: 1,
        color: "b",
        type: PlayerType.humanLocal,
      },
      {
        username: "darren-w",
        eloScore: 1,
        color: "w",
        type: PlayerType.humanRemote,
      },
    ];
    const reversedPlayerStore = createStoreWithPlayers(players);
    const { container } = renderComponentWithStore(
      <Game />,
      reversedPlayerStore
    );

    const playerNames = screen.getAllByTestId("player-name");
    const topName = playerNames[0];
    const lowerName = playerNames[1];

    expect(topName).toHaveTextContent("darren-w");
    expect(lowerName).toHaveTextContent("darren-b");

    /* eslint-disable testing-library/no-container, testing-library/no-node-access */
    const e1 = container.querySelector('[data-square="e1"]') as HTMLElement;
    const e8 = container.querySelector('[data-square="e8"]') as HTMLElement;
    /* eslint-enable */

    expect(within(e1).getByTestId("light-king")).toBeTruthy();
    expect(within(e8).getByTestId("dark-king")).toBeTruthy();
  });
});
