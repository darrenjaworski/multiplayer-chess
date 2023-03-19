import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import { getGameId } from "../state-management/slices/game";
import {
  connected,
  disconnected,
} from "../state-management/slices/gameSockets";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export function WebSocketsProvider({ children }: WebSocketProviderProps) {
  const gameId = useAppSelector(getGameId);
  const wsBaseUrl = process.env.REACT_APP_WEBSOCKETS_URL as string;
  const wsURL = `${wsBaseUrl}`;
  const websocket = new WebSocket(wsURL);
  const dispatch = useAppDispatch();

  useEffect(() => {
    websocket.onopen = () => {
      console.log("on open");
      dispatch(connected());
    };

    websocket.onmessage = (event) => {
      console.log("on message");
    };

    websocket.onclose = () => {
      console.log("on close");
      dispatch(disconnected());
    };

    websocket.onerror = (error) => {
      console.error("websockets has encountered an error", error);
      dispatch(disconnected());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
