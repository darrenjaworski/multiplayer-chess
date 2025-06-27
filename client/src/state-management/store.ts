import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appReducer";

export const store = configureStore({
  reducer: appReducer,
  devTools: (import.meta as any).env.MODE !== "production",
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
