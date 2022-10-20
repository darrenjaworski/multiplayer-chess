import { Middleware } from "redux";
import { io } from "socket.io-client";
import { connected, disconnected } from "../slices/gameSockets";

export const gameSocketMiddleware: Middleware =
  (store) => (next) => (action) => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      store.dispatch(connected());
    });

    socket.on("disconnect", () => {
      store.dispatch(disconnected());
    });

    next(action);
  };
