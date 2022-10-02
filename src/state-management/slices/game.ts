import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Chess, Color, DEFAULT_POSITION as StartingFEN } from "chess.js";
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
      const game = new Chess(action.payload);
      state.turn = game.turn();
    },
  },
});

export const { updateFen } = GameSlice.actions;

export function getTurn(state: RootState) {
  return state.game.turn;
}

export function getFEN(state: RootState) {
  return state.game.fen;
}
