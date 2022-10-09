import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Color, Move, Piece } from "chess.js";
import { Chess, DEFAULT_POSITION as startingFEN } from "chess.js";
import { RootState } from "./../store";

type MoveElapsed = {
  history: Move;
  elapsed: number;
  remaining: number;
};

export interface GameState {
  fen: string;
  turn: Color;
  captured: Piece[];
  history: Move[];
  playerClockHistory: MoveElapsed[];
}

const initialState: GameState = {
  fen: startingFEN,
  turn: "w",
  captured: [],
  history: [],
  playerClockHistory: [],
};

interface UpdateGamePayload {
  fen: string;
  move: Move;
}

type UpdatePlayerClockPayload = number;

export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGame: (state, action: PayloadAction<UpdateGamePayload>) => {
      const game = new Chess(action.payload.fen);
      const updatedHistory = [...state.history, action.payload.move];

      state.fen = game.fen();
      state.turn = game.turn();
      state.history = updatedHistory;
    },
    addCaptured: (state, action: PayloadAction<Piece>) => {
      state.captured = [...state.captured, action.payload];
    },
    removeCaptured: (state, action: PayloadAction<Piece>) => {
      const searchPiece = action.payload;
      const firstMatchIndex = [...state.captured].findIndex(
        (piece) =>
          piece.color === searchPiece.color && piece.type === searchPiece.type
      );
      state.captured = [
        ...state.captured.slice(0, firstMatchIndex),
        ...state.captured.slice(firstMatchIndex + 1),
      ];
    },
    loadFromPGN: (state, action: PayloadAction<string>) => {
      const game = new Chess();
      game.loadPgn(action.payload);

      state.fen = game.fen();
      state.turn = game.turn();
      state.history = game.history({ verbose: true }) as Move[];
    },
    loadFromHistory: (state, action: PayloadAction<Move[]>) => {
      const game = new Chess();
      [...action.payload].forEach((move) => {
        game.move(move.san);
      });

      state.fen = game.fen();
      state.turn = game.turn();
      state.history = game.history({ verbose: true }) as Move[];
    },
    undoMove: (state, _action: PayloadAction<void>) => {
      const game = new Chess();
      [...state.history].forEach((move) => {
        game.move(move.san);
      });
      const lastMove = game.undo();
      if (lastMove?.captured) {
        const capturedColor = lastMove.color === "w" ? "b" : "w";
        const capturedPiece = lastMove.captured;

        const searchPiece = { color: capturedColor, type: capturedPiece };
        const firstMatchIndex = [...state.captured].findIndex(
          (piece) =>
            piece.color === searchPiece.color && piece.type === searchPiece.type
        );
        state.captured = [
          ...state.captured.slice(0, firstMatchIndex),
          ...state.captured.slice(firstMatchIndex + 1),
        ];
      }

      state.fen = game.fen();
      state.turn = game.turn();
      state.history = game.history({ verbose: true }) as Move[];
    },
    updatePlayerClock: (
      state,
      action: PayloadAction<UpdatePlayerClockPayload>
    ) => {
      // TODO refactor the hell out of this
      const playerClockCopy = state.playerClockHistory
        ? [...state.playerClockHistory]
        : [];

      const playerColor = state.turn === "w" ? "b" : "w";

      const playerColorClock = playerClockCopy.filter(
        (moveElapsed) => moveElapsed.history.color === playerColor
      );

      const hasLastPlayerClock = playerColorClock[playerColorClock.length - 1];

      let elapsedTime = 0;
      if (hasLastPlayerClock) {
        elapsedTime =
          playerColorClock[playerColorClock.length - 1].remaining -
          action.payload;
      } else if (playerClockCopy.length === 1) {
        elapsedTime = playerClockCopy[0].remaining - action.payload;
      }

      const clockUpdate: MoveElapsed = {
        history: state.history[state.history.length - 1],
        elapsed: elapsedTime,
        remaining: action.payload,
      };

      state.playerClockHistory = [...playerClockCopy, clockUpdate];
    },
  },
});

export const {
  updateGame,
  addCaptured,
  removeCaptured,
  loadFromPGN,
  loadFromHistory,
  undoMove,
  updatePlayerClock,
} = GameSlice.actions;

export const getGameStarted = (state: RootState) =>
  state.game.history.length > 0;

export const getTurn = (state: RootState) => state.game.turn;

export const getFEN = (state: RootState) => state.game.fen;

export const getHistory = (state: RootState) => state.game.history;

export const getIsEndgame = (state: RootState) => {
  const game = new Chess(state.game.fen);
  return game.isGameOver();
};

export const getPGN = (state: RootState) => {
  const game = new Chess();
  [...state.game.history].forEach((move) => {
    game.move(move.san);
  });
  return game.pgn();
};

export const getCaptured =
  (color: Color | undefined = undefined) =>
  (state: RootState) => {
    if (color) {
      return state.game.captured.filter((piece) => piece.color === color);
    }
    return state.game.captured;
  };

export const getIsColorInCheck = (color: Color) => (state: RootState) => {
  const game = new Chess(state.game.fen);
  if (color === game.turn()) return game.inCheck();
  return false;
};

export const getIsColorInCheckMate = (color: Color) => (state: RootState) => {
  const game = new Chess(state.game.fen);
  if (!game.isGameOver()) return;

  if (color === game.turn()) return game.isCheckmate();
  return false;
};
