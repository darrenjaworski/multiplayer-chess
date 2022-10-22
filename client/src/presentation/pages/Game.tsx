import styled from "@emotion/styled";
import { useAppSelector } from "../../state-management/hooks";
import { getPlayers } from "../../state-management/slices/game";
import { Chessboard } from "../components/Chessboard";
import { GamePlayer } from "../components/GamePlayer";
import { GameTicker } from "../components/GameTicker";

const GameScreen = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
  row-gap: 0.5rem;
`;

export const Game = () => {
  const players = useAppSelector(getPlayers);
  const playerOne = players[0];
  const playerTwo = players[1];

  return (
    <GameScreen data-testid="game">
      <GameTicker />
      <GamePlayer player={playerTwo} />
      <Chessboard />
      <GamePlayer player={playerOne} />
    </GameScreen>
  );
};
