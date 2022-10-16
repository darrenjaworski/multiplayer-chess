import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import {
  GiChessBishop,
  GiChessKing,
  GiChessKnight,
  GiChessPawn,
  GiChessQueen,
  GiChessRook,
} from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { PieceToEnglishMap } from "../../components/GameHistory";
import {
  BoardOptions,
  BoardTheme,
  CustomPiecesColors,
} from "../@types/BoardTheme";

const iconMap = {
  Fa: {
    wB: FaChessBishop,
    wK: FaChessKing,
    wN: FaChessKnight,
    wR: FaChessRook,
    wQ: FaChessQueen,
    wP: FaChessPawn,
    bB: FaChessBishop,
    bK: FaChessKing,
    bN: FaChessKnight,
    bR: FaChessRook,
    bQ: FaChessQueen,
    bP: FaChessPawn,
  },
  Gi: {
    wB: GiChessBishop,
    wK: GiChessKing,
    wN: GiChessKnight,
    wR: GiChessRook,
    wQ: GiChessQueen,
    wP: GiChessPawn,
    bB: GiChessBishop,
    bK: GiChessKing,
    bN: GiChessKnight,
    bR: GiChessRook,
    bQ: GiChessQueen,
    bP: GiChessPawn,
  },
};

// TODO fix ts-ignores
// TODO refactor to generate all icons so you can switch icons on the fly like other settings
export const generateTheme = (options: BoardOptions): BoardTheme => {
  const piecesColor: CustomPiecesColors = {
    dark: options.darkPieces,
    light: options.lightPieces,
  };

  const lightPiecesProps = {
    size: scaleSize(),
    color: piecesColor.light,
    style: { marginTop: "0.25rem" },
  };
  const darkPiecesProps = {
    size: scaleSize(),
    color: piecesColor.dark,
    style: { marginTop: "0.25rem" },
  };

  const customPieces = Object.keys(iconMap[options.iconType]).reduce(
    (pieces, key) => {
      // @ts-ignore
      const Element: IconType = iconMap[options.iconType][key];
      const isLightPiece = key.charAt(0) === "w";
      // @ts-ignore
      const englishNameFromAbbreviation =
        // @ts-ignore
        PieceToEnglishMap[key.charAt(1).toLowerCase()];
      const props = isLightPiece ? lightPiecesProps : darkPiecesProps;
      // @ts-ignore
      pieces[key] = () => {
        return (
          <Element
            {...props}
            data-testid={`${
              isLightPiece ? "light" : "dark"
            }-${englishNameFromAbbreviation}`}
          />
        );
      };
      return pieces;
    },
    {}
  );

  return {
    customDarkSquareStyle: {
      backgroundColor: options.darkSquareBackground,
    },
    customLightSquareStyle: {
      backgroundColor: options.lightSquareBackground,
    },
    customPieces,
    colors: {
      lightPieces: piecesColor.light,
      darkPieces: piecesColor.dark,
      darkSquare: options.darkSquareBackground,
      lightSquare: options.lightSquareBackground,
    },
  };
};

function scaleSize() {
  const ratio = 3.5 / 560;
  const boardSize = Math.min(window.innerWidth * 0.9, 560);
  return `${ratio * boardSize}rem`;
}
