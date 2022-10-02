import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Color, DEFAULT_POSITION as StartingFEN } from "chess.js";
import { RootState } from "./../store";

export interface GameState {
  fen: string;
  turn: Color;
}

const initialState = {
  fen: StartingFEN,
  turn: "w",
};

export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateFen: (state, action: PayloadAction<string>) => {
      state.fen = action.payload;
    },
    updateTurn: (state, action: PayloadAction<Color>) => {
      state.turn = action.payload;
    },
  },
});

export const { updateFen, updateTurn } = GameSlice.actions;

export function getTurn(state: RootState) {
  return state.game.turn;
}

export function getFEN(state: RootState) {
  return state.game.fen;
}
