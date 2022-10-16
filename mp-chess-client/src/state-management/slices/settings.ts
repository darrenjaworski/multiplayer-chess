import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../store";

interface SettingsState {
  soundEffects: boolean;
}

export const initialState: SettingsState = {
  soundEffects: true,
};

export const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    playSounds: (state, action: PayloadAction<boolean>) => {
      state.soundEffects = action.payload;
    },
  },
});

export const { playSounds } = SettingsSlice.actions;

export const getShouldPlaySounds = (state: RootState) =>
  state.settings.soundEffects;
