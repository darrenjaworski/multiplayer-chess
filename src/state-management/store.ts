import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appReducer";

export const store = configureStore({ reducer: appReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
