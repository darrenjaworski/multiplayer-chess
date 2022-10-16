import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import { BoardOptions, CustomPiecesColors } from "../@types/BoardTheme";

// TODO make it possible to switch icon usages
// TODO write tests around this
export const generateTheme = (options: BoardOptions) => {
  const piecesColor: CustomPiecesColors = {
    dark: options.darkPieces,
    light: options.lightPieces,
  };

  const lightPiecesProps = {
    size: scaleSize(),
    color: piecesColor.light,
    style: { marginTop: "0.25rem" },
  };
  const darkPiecesPRops = {
    size: scaleSize(),
    color: piecesColor.dark,
    style: { marginTop: "0.25rem" },
  };

  return {
    customDarkSquareStyle: {
      backgroundColor: options.darkSquareBackground,
    },
    customLightSquareStyle: {
      backgroundColor: options.lightSquareBackground,
    },
    customPieces: {
      wB: () => <FaChessBishop {...lightPiecesProps} />,
      wK: () => <FaChessKing {...lightPiecesProps} />,
      wN: () => <FaChessKnight {...lightPiecesProps} />,
      wR: () => <FaChessRook {...lightPiecesProps} />,
      wQ: () => <FaChessQueen {...lightPiecesProps} />,
      wP: () => <FaChessPawn {...lightPiecesProps} />,
      bB: () => <FaChessBishop {...darkPiecesPRops} />,
      bK: () => <FaChessKing {...darkPiecesPRops} />,
      bN: () => <FaChessKnight {...darkPiecesPRops} />,
      bR: () => <FaChessRook {...darkPiecesPRops} />,
      bQ: () => <FaChessQueen {...darkPiecesPRops} />,
      bP: () => <FaChessPawn {...darkPiecesPRops} />,
    },
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
