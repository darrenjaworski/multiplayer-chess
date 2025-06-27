import { io } from "socket.io-client";

const wsURL = (import.meta as any).env.VITE_WEBSOCKETS_URL as string;

export const socket = io(wsURL);
