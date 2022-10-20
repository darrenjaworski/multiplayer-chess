import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { gameSocketMiddleware } from "./middleware/GameSocketsMiddleware";

export const appMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => getDefaultMiddleware().concat(gameSocketMiddleware);
