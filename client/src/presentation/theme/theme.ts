import { useTheme } from "@emotion/react";
import { getBoardTheme } from "../../state-management/slices/theme";
import { useAppSelector } from "./../../state-management/hooks";
import { BoardTheme } from "./@types/BoardTheme";
import { Themes } from "./@types/Theme";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

import { midnight } from "./boards/midnight";

export const theme: Themes = {
  light: {
    ...lightTheme,
  },
  dark: {
    ...darkTheme,
  },
};

export const darkBoardKeys = Object.keys(theme.dark.boards);
export const lightBoardKeys = Object.keys(theme.light.boards);

const defaultBoardTheme = midnight;

export function useBoardTheme(): BoardTheme {
  const boardTheme = useAppSelector(getBoardTheme);
  const theme = useTheme();

  if (!theme?.boards) return defaultBoardTheme;

  const darkSquareStyles = { ...boardTheme.customDarkSquareStyle };
  const lightSquareStyles = { ...boardTheme.customLightSquareStyle };
  const customPieces = boardTheme.customPieces;

  return {
    customDarkSquareStyle: darkSquareStyles,
    customLightSquareStyle: lightSquareStyles,
    customPieces: customPieces,
    colors: boardTheme.colors,
  };
}
