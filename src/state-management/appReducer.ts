import { combineReducers } from "@reduxjs/toolkit";
import { GameSlice } from "./slices/game";

export const appReducer = combineReducers({
  game: GameSlice.reducer,
});
