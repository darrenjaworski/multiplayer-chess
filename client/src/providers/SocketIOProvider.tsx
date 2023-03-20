import React, { useEffect } from "react";
import { useAppDispatch } from "../state-management/hooks";
import { updateGame, UpdateGamePayload } from "../state-management/slices/game";
import {
  connected,
  disconnected,
} from "../state-management/slices/gameSockets";
import { socket } from "./socket";

interface SocketIOProviderProps {
  children: React.ReactNode;
}

export function SocketIOProvider({ children }: SocketIOProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("on open");
      dispatch(connected());
    });

    socket.on("disconnect", () => {
      console.log("on close");
      dispatch(disconnected());
    });

    socket.on("gameEvent", (data: UpdateGamePayload) => {
      dispatch(updateGame(data));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
