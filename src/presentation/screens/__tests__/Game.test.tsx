import { render, screen } from "@testing-library/react";
import { Game } from "../Game";

describe("game screen", () => {
  it("shows player names on screen", () => {
    render(<Game />);

    const players = screen.getAllByTestId("player");

    const playerOne = players[0];
    const playerTwo = players[1];

    expect(playerOne).toBeInTheDocument();
    expect(playerTwo).toBeInTheDocument();
  });

  it("shows the player names", () => {
    const playerOne = { username: "dwight", eloScore: 1 };
    const playerTwo = { username: "andy", eloScore: 2 };

    render(<Game playerOne={playerOne} playerTwo={playerTwo} />);

    const players = screen.getAllByTestId("player-name");
    const p1Name = players[0];
    const p2Name = players[1];

    expect(p1Name).toHaveTextContent(playerOne.username);
    expect(p2Name).toHaveTextContent(playerTwo.username);
  });

  it("shows the player elo rankings", () => {
    const playerOne = { username: "dwight", eloScore: 1 };
    const playerTwo = { username: "andy", eloScore: 2 };

    render(<Game playerOne={playerOne} playerTwo={playerTwo} />);

    const players = screen.getAllByTestId("player-ranking");
    const p1Elo = players[0];
    const p2Elo = players[1];

    expect(p1Elo).toHaveTextContent(String(playerOne.eloScore));
    expect(p2Elo).toHaveTextContent(String(playerTwo.eloScore));
  });
});
