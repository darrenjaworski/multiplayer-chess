import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Chess, Color, DEFAULT_POSITION as StartingFEN, Piece } from "chess.js";
import { RootState } from "./../store";

export interface GameState {
  fen: string;
  turn: Color;
  captured: Piece[];
}

const initialState: GameState = {
  fen: StartingFEN,
  turn: "w",
  captured: [],
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
    addCaptured: (state, action: PayloadAction<Piece>) => {
      state.captured = [...state.captured, action.payload];
    },
  },
});

export const { updateFen, addCaptured } = GameSlice.actions;

export const getTurn = (state: RootState) => state.game.turn;

export const getFEN = (state: RootState) => state.game.fen;

export const getCaptured =
  (color: Color | undefined = undefined) =>
  (state: RootState) => {
    if (color) {
      return state.game.captured.filter((piece) => piece.color === color);
    }
    return state.game.captured;
  };
