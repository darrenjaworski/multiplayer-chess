import { io } from "socket.io-client";

const wsURL = process.env.REACT_APP_WEBSOCKETS_URL as string;

export const socket = io(wsURL);
