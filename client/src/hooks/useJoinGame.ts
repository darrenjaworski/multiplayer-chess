import { useEffect } from "react";
import { socket } from "../providers/socket";
import { useAppSelector } from "../state-management/hooks";
import { GameTypes, getGameType } from "../state-management/slices/game";

interface JoinGameOptions {
  gameId: string;
  playerName: string;
  preferredColor?: "white" | "black";
}

// TODO prevent multiple join game calls
export function useJoinGame({
  gameId,
  playerName,
  preferredColor,
}: JoinGameOptions) {
  const gameType = useAppSelector(getGameType);
  useEffect(() => {
    if (gameType !== GameTypes.humanVsHumanLocal) {
      socket.emit("joinGame", { gameId, playerName, preferredColor });
      return () => {
        socket.emit("leaveGame", { gameId });
      };
    }
    // For local games, do nothing
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, playerName, preferredColor, gameType]);
}
