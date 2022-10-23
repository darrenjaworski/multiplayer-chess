import { createSlice } from "@reduxjs/toolkit";

interface GameSocketState {
  isConnected: boolean;
  clientId: string | null;
}

export const initialState: GameSocketState = {
  isConnected: false,
  clientId: null,
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
