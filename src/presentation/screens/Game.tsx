import styled from "@emotion/styled";
import { Chessboard } from "../components/Chessboard";
import { GamePlayer } from "../components/GamePlayer";
import { GameTicker } from "../components/GameTicker";

export interface Player {
  username: string;
  eloScore: number;
}

interface GameProps {
  playerOne: Player;
  playerTwo: Player;
}

export enum GameMode {
  untimed,
  lightning,
}

const GameScreen = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
`;

export const Game = (props: GameProps) => {
  const { playerOne, playerTwo } = props;

  const chosenMode = GameMode.untimed;
  return (
    <>
      <GameScreen data-testid="game">
        <GameTicker />
        <GamePlayer player={playerOne} piecesColor="b" mode={chosenMode} />
        <Chessboard />
        <GamePlayer player={playerTwo} piecesColor="w" mode={chosenMode} />
      </GameScreen>
    </>
  );
};

Game.defaultProps = {
  playerOne: { username: "foo", eloScore: 1 },
  playerTwo: { username: "bar", eloScore: 2 },
};
