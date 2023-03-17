import React, { useEffect } from "react";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export function WebSocketsProvider({ children }: WebSocketProviderProps) {
  const wsURL = process.env.WEBSOCKETS_URL as string;
  const websocket = new WebSocket(wsURL);

  useEffect(() => {
    websocket.onopen = () => {
      console.log("on open");
    };

    websocket.onmessage = (event) => {
      console.log("on message");
    };

    websocket.onclose = () => {
      console.log("on close");
    };

    websocket.onerror = (error) => {
      console.log("on error");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
