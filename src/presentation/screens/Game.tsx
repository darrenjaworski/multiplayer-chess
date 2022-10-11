import styled from "@emotion/styled";
import { useAppSelector } from "../../state-management/hooks";
import { getGameMode, getPlayers } from "../../state-management/slices/game";
import { Chessboard } from "../components/Chessboard";
import { GamePlayer } from "../components/GamePlayer";
import { GameTicker } from "../components/GameTicker";

export interface Player {
  username: string;
  eloScore: number;
}

const GameScreen = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
`;

export const Game = () => {
  const players = useAppSelector(getPlayers);
  const playerOne = players[0];
  const playerTwo = players[1];

  const chosenMode = useAppSelector(getGameMode);
  return (
    <GameScreen data-testid="game">
      <GameTicker />
      <GamePlayer player={playerOne} piecesColor="b" mode={chosenMode} />
      <Chessboard />
      <GamePlayer player={playerTwo} piecesColor="w" mode={chosenMode} />
    </GameScreen>
  );
};
