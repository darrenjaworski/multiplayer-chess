import { combineReducers } from "@reduxjs/toolkit";
import { GameSlice } from "./slices/game";
import { GameSocketSlice } from "./slices/gameSockets";
import { SettingsSlice } from "./slices/settings";
import { ThemeSlice } from "./slices/theme";

export const appReducer = combineReducers({
  game: GameSlice.reducer,
  theme: ThemeSlice.reducer,
  settings: SettingsSlice.reducer,
  gameSockets: GameSocketSlice.reducer,
});
