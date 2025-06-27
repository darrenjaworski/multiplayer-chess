export interface BoardTheme {
  customDarkSquareStyle: Record<string, string>;
  customLightSquareStyle: Record<string, string>;
  customPieces: {
    [key: string]: (args: {
      isDragging: boolean;
      squareWidth: number;
      square?: string;
    }) => React.ReactElement;
  };
  colors: BoardColors;
}

export interface Boards {
  [key: string]: BoardTheme;
}

export interface CustomPiecesColors {
  light: string;
  dark: string;
}

export type AvailableIconTypes = "Fa" | "Gi";

export interface BoardOptions {
  lightPieces: string;
  darkPieces: string;
  darkSquareBackground: string;
  lightSquareBackground: string;
  iconType: AvailableIconTypes;
}

interface BoardColors {
  lightPieces: string;
  darkPieces: string;
  darkSquare: string;
  lightSquare: string;
}
