import styled from "@emotion/styled";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useJoinGame } from "../../hooks/useJoinGame";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  GameTypes,
  getGameId,
  getGameType,
  getPlayers,
  updateId,
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
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useJoinGame(id ?? gameId);

  const bottomPlayer = players[0];
  const topPlayer = players[1];
  if (id && gameId !== id) {
    dispatch(updateId(id));
  }

  useEffect(() => {
    const route = `/game/${gameId}`;
    if (location.pathname !== route) {
      navigate("/game/" + gameId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
