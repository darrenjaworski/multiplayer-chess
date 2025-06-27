import { useEffect } from "react";
import { socket } from "../providers/socket";

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
  useEffect(() => {
    socket.emit("joinGame", { gameId, playerName, preferredColor });
    return () => {
      socket.emit("leaveGame", { gameId });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, playerName, preferredColor]);
}
