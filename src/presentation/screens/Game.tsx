import styled from "@emotion/styled";
import { Chessboard } from "../components/Chessboard";
import { GamePlayer } from "../components/GamePlayer";

export interface Player {
  username: string;
  eloScore: number;
}

interface GameProps {
  playerOne: Player;
  playerTwo: Player;
}

const GameScreen = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Game = (props: GameProps) => {
  const { playerOne, playerTwo } = props;
  return (
    <GameScreen data-testid="game">
      <GamePlayer player={playerOne} piecesColor="b" />
      <Chessboard />
      <GamePlayer player={playerTwo} piecesColor="w" />
    </GameScreen>
  );
};

Game.defaultProps = {
  playerOne: { username: "foo", eloScore: 1 },
  playerTwo: { username: "bar", eloScore: 2 },
};
