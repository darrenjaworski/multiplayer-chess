import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const appMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => getDefaultMiddleware().concat();
