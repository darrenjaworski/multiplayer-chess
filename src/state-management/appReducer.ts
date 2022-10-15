import { combineReducers } from "@reduxjs/toolkit";
import { GameSlice } from "./slices/game";
import { ThemeSlice } from "./slices/theme";

export const appReducer = combineReducers({
  game: GameSlice.reducer,
  theme: ThemeSlice.reducer,
});
