import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import {
  GameTypes,
  getGameType,
  loadFromHistory,
} from "../state-management/slices/game";
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

export function SocketIOProvider({
  children,
}: Readonly<SocketIOProviderProps>) {
  const dispatch = useAppDispatch();
  const gameType = useAppSelector(getGameType);

  useEffect(() => {
    if (gameType === GameTypes.humanVsHumanLocal) {
      // Do not connect for local games
      return;
    }
    socket.on("connect", () => {
      dispatch(connected());
    });

    socket.on("disconnect", () => {
      dispatch(disconnected());
    });

    socket.on("gameEvent", (data: ServerUpdate) => {
      dispatch(loadFromHistory(data.history));
    });

    socket.on("makeMove", (data: any) => {
      // handle move event if needed in the future
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameType]);

  return <>{children}</>;
}

export function useSocket() {
  return socket;
}
