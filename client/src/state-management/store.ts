import { configureStore } from "@reduxjs/toolkit";
import { appMiddleware } from "./appMiddleware";
import { appReducer } from "./appReducer";

export const store = configureStore({
  reducer: appReducer,
  middleware: appMiddleware,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
