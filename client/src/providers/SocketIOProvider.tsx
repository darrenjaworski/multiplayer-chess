import React, { useEffect } from "react";
import { useAppDispatch } from "../state-management/hooks";
import { loadFromHistory } from "../state-management/slices/game";
import {
  connected,
  disconnected,
} from "../state-management/slices/gameSockets";
import { socket } from "./socket";

interface SocketIOProviderProps {
  children: React.ReactNode;
}

interface ServerUpdate {
  history: [];
}

export function SocketIOProvider({ children }: SocketIOProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(connected());
    });

    socket.on("disconnect", () => {
      dispatch(disconnected());
    });

    socket.on("gameEvent", (data: ServerUpdate) => {
      dispatch(loadFromHistory(data.history));
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
