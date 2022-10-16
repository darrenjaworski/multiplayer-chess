import { CustomPieces } from "react-chessboard";

export interface BoardTheme {
  customDarkSquareStyle?: CustomDarkSquareStyle;
  customLightSquareStyle?: CustomLightSquareStyle;
  customPieces: CustomPieces;
  colors: BoardColors;
}

export interface Boards {
  [key: string]: BoardTheme;
}

interface CustomDarkSquareStyle {
  backgroundColor: string;
}

interface CustomLightSquareStyle extends CustomDarkSquareStyle {}

export interface CustomPiecesColors {
  light: string;
  dark: string;
}

export interface BoardOptions {
  lightPieces: string;
  darkPieces: string;
  darkSquareBackground: string;
  lightSquareBackground: string;
  iconType: "Fa" | "Gi";
}

interface BoardColors {
  lightPieces: string;
  darkPieces: string;
  darkSquare: string;
  lightSquare: string;
}
