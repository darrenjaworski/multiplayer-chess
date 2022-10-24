import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Chess } from "chess.js";
import io from "socket.io-client";

let socket = io("http://localhost:3001");

const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3001");
  }
  return socket;
};

interface PGNPayload {
  pgn: string;
}

export const gameSocketApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (build) => ({
    sendGameUpdate: build.mutation<string, { pgn: string }>({
      // @ts-ignore
      query({ pgn }) {
        const socket = getSocket();
        socket.emit("gameUpdate", pgn);
        // return new Promise((resolve) => {
        //   socket.emit("gameUpdate", pgn);
        // });
      },
    }),
    getGameUpdates: build.query<PGNPayload, string>({
      // @ts-ignore
      queryFn() {
        const game = new Chess();
        return { data: { pgn: game.pgn() } };
      },
      async onCacheEntryAdded(
        gameId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();

          socket.on("connect", () => {
            socket.emit("join", gameId);
          });

          socket.on("gameUpdate", (pgn) => {
            updateCachedData((draft) => {
              draft.pgn = pgn;
            });
          });

          await cacheEntryRemoved;

          socket.off("connect");
          socket.off("disconnect");
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetGameUpdatesQuery, useSendGameUpdateMutation } =
  gameSocketApi;
