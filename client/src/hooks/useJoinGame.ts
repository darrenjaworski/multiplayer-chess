import { useEffect } from "react";
import { socket } from "../providers/socket";

export function useJoinGame(gameId: string) {
  useEffect(() => {
    socket.emit("joinGame", { gameId });
    return () => {
      socket.emit("leaveGame", { gameId });
    };
  }, [gameId]);
}
