import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appReducer";
import { appMiddleware } from "./appMiddleware";

export const store = configureStore({
  reducer: appReducer,
  middleware: appMiddleware,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
