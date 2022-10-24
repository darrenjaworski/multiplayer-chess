import styled from "@emotion/styled";
import { useGetGameUpdatesQuery } from "../../state-management/api/gameSockets";
import { useAppSelector } from "../../state-management/hooks";
import {
  GameTypes,
  getGameId,
  getGameType,
  getPlayers,
} from "../../state-management/slices/game";
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
  const gameType = useAppSelector(getGameType);
  const players = useAppSelector(getPlayers);
  const gameId = useAppSelector(getGameId);
  useGetGameUpdatesQuery(gameId);

  const bottomPlayer = players[0];
  const topPlayer = players[1];

  return (
    <GameScreen data-testid="game">
      <GameTicker />
      <GamePlayer
        player={topPlayer}
        isPlayable={gameType === GameTypes.humanVsHumanLocal}
      />
      <Chessboard
        boardOrientation={bottomPlayer.color === "b" ? "black" : "white"}
      />
      <GamePlayer
        player={bottomPlayer}
        isPlayable={gameType !== GameTypes.observer}
      />
    </GameScreen>
  );
};
