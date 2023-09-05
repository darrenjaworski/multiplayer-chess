import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../providers/socket";
import { RootState } from "../store";
import { UpdateGamePayload, getGameId } from "./game";

interface GameSocketState {
  isConnected: boolean;
}

export const initialState: GameSocketState = {
  isConnected: false,
};

export const GameSocketSlice = createSlice({
  name: "gameSocket",
  initialState,
  reducers: {
    connected: (state) => {
      state.isConnected = true;
    },
    disconnected: (state) => {
      state.isConnected = false;
    },
  },
});

export const { connected, disconnected } = GameSocketSlice.actions;

export const sendGameUpdate = createAsyncThunk(
  "gameSocket/sendGameUpdate",
  async (gameUpdate: UpdateGamePayload, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const gameId = getGameId(state);
    const gameUpdateData = {
      gameId,
      fen: gameUpdate.fen,
      history: [...state.game.history, gameUpdate.move],
    };
    socket.emit("gameUpdate", gameUpdateData);
  }
);
