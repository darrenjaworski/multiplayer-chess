import { useTheme } from "@emotion/react";
import { Themes } from "./@types/Theme";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export const theme: Themes = {
  light: {
    ...lightTheme,
  },
  dark: {
    ...darkTheme,
  },
};

export function useBoardTheme() {
  const theme = useTheme();

  let darkSquareStyles = {};
  let lightSquareStyles = {};
  let customPieces = undefined;

  let boardStyles = {
    customDarkSquareStyle: {},
    customLightSquareStyle: {},
    customPieces: {},
    colors: {},
  };

  if (!theme?.boards) return boardStyles;

  const boardThemeKey = Object.keys(theme.boards)[0];
  const boardTheme = theme.boards[boardThemeKey];

  darkSquareStyles = { ...boardTheme.customDarkSquareStyle };
  lightSquareStyles = { ...boardTheme.customLightSquareStyle };
  customPieces = boardTheme.customPieces;

  return {
    customDarkSquareStyle: darkSquareStyles,
    customLightSquareStyle: lightSquareStyles,
    customPieces: customPieces,
    colors: boardTheme.colors,
  };
}
