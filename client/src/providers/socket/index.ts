import { io } from "socket.io-client";

const wsURL = (import.meta as any).env.VITE_WEBSOCKETS_URL as string;
console.log("WebSocket URL:", wsURL);

export const socket = io(wsURL);
