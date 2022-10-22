import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { gameSocketApi } from "./api/gameSockets";

export const appMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => getDefaultMiddleware().concat(gameSocketApi.middleware);
