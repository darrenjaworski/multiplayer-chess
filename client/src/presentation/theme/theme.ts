import { useTheme } from "@emotion/react";
import { getBoardTheme } from "../../state-management/slices/theme";
import { useAppSelector } from "./../../state-management/hooks";
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

export const darkBoardKeys = Object.keys(theme.dark.boards);
export const lightBoardKeys = Object.keys(theme.light.boards);

export function useBoardTheme() {
  const boardTheme = useAppSelector(getBoardTheme);
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
