import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AvailableThemes, Themes } from "../../presentation/theme/@types/Theme";
import { theme } from "../../presentation/theme/theme";
import { Boards } from "./../../presentation/theme/@types/BoardTheme";
import { RootState } from "./../store";

interface ThemeState {
  currentMode: keyof Themes;
  lightBoard: keyof Boards;
  darkBoard: keyof Boards;
}

type SelectedThemePayload = AvailableThemes;
type SelectedBoardThemePayload = keyof Boards;

export const initialState: ThemeState = {
  currentMode: "dark",
  lightBoard: "tomato",
  darkBoard: "midnight",
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<SelectedThemePayload>) => {
      state.currentMode = action.payload;
    },
    updateBoardTheme: (
      state,
      action: PayloadAction<SelectedBoardThemePayload>
    ) => {
      if (state.currentMode === "dark") {
        state.darkBoard = action.payload;
        return;
      }

      state.lightBoard = action.payload;
    },
  },
});

export const { updateBoardTheme, updateTheme } = ThemeSlice.actions;

export const getBoardTheme = (state: RootState) => {
  const boardThemeKey =
    state.theme.currentMode === "dark"
      ? state.theme.darkBoard
      : state.theme.lightBoard;

  // @ts-ignore
  return theme[state.theme.currentMode].boards[boardThemeKey];
};

export const getLightBoardKey = (state: RootState) => state.theme.lightBoard;
export const getDarkBoardKey = (state: RootState) => state.theme.darkBoard;

// @ts-ignore
export const getTheme = (state: RootState) => theme[state.theme.currentMode];

export const getThemeMode = (state: RootState) => state.theme.currentMode;
