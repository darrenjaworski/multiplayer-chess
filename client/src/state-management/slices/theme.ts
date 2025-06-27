import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AvailableThemes } from "../../presentation/theme/@types/Theme";
import { theme } from "../../presentation/theme/theme";
import { Boards } from "./../../presentation/theme/@types/BoardTheme";
import { RootState } from "./../store";
import { createSelector } from "./selectors";

interface ThemeState {
  currentMode: AvailableThemes;
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

// Memoized selector for board theme
export const getBoardTheme = createSelector(
  (state: RootState) => state.theme.currentMode,
  (state: RootState) => state.theme.darkBoard,
  (state: RootState) => state.theme.lightBoard,
  (currentMode, darkBoard, lightBoard) => {
    const boardThemeKey = currentMode === "dark" ? darkBoard : lightBoard;
    return theme[currentMode].boards[boardThemeKey];
  }
);

export const getLightBoardKey = (state: RootState) => state.theme.lightBoard;
export const getDarkBoardKey = (state: RootState) => state.theme.darkBoard;

export const getTheme = createSelector(
  (state: RootState) => state.theme.currentMode,
  (currentMode) => theme[currentMode]
);

export const getThemeMode = (state: RootState) => state.theme.currentMode;
