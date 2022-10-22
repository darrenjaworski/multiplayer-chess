import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import io from "socket.io-client";

interface Message {
  fen: string;
}

export const gameSocketApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (build) => ({
    getGameUpdates: build.query<Message, undefined>({
      query: () => ``,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = io("http://localhost:3001");

          socket.on("connect", () => {
            console.log("connected!");
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

export const { useGetGameUpdatesQuery } = gameSocketApi;