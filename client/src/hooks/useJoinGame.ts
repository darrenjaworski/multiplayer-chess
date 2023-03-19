import { useEffect } from "react";
import { socket } from "../providers/socket";
import { useAppSelector } from "../state-management/hooks";
import { getGameId } from "../state-management/slices/game";

export function useJoinGame() {
  const gameId = useAppSelector(getGameId);

  useEffect(() => {
    socket.emit("joinGame", { gameId });
    return () => {
      socket.emit("leaveGame", { gameId });
    };
  }, [gameId]);
}
