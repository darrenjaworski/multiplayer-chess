import { useEffect } from "react";
import { socket } from "../providers/socket";

// TODO prevent multiple join game calls
export function useJoinGame(gameId: string) {
  useEffect(() => {
    socket.emit("joinGame", { gameId });
    return () => {
      socket.emit("leaveGame", { gameId });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
