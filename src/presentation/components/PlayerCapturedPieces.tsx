import { useTheme } from "@emotion/react";
import type { Color, Piece, PieceSymbol } from "chess.js";
import type { IconType } from "react-icons";
import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import { useAppSelector } from "../../state-management/hooks";
import { getCaptured } from "../../state-management/slices/game";

type PieceIconMap = {
  [key in PieceSymbol]: IconType;
};

const pieceToIconMap: PieceIconMap = {
  p: FaChessPawn,
  n: FaChessKnight,
  k: FaChessKing,
  q: FaChessQueen,
  r: FaChessRook,
  b: FaChessBishop,
};

interface PlayerCapturedPiecesProps {
  piecesColor: Color;
}

export const PlayerCapturedPieces = (props: PlayerCapturedPiecesProps) => {
  const { piecesColor } = props;

  const theme = useTheme();
  const capturedPieces = useAppSelector(getCaptured(piecesColor));

  if (capturedPieces.length === 0) return null;

  const capturedPiecesIcons = capturedPieces.map((piece: Piece, i: number) => {
    const Icon = pieceToIconMap[piece.type];
    return (
      <Icon
        key={`${i}-${piecesColor}-${piece.type}`}
        data-testid={`${piecesColor}-${i}`}
        // @ts-ignore
        color={theme.colors.text}
      />
    );
  });

  return (
    <div data-testid={`${piecesColor}-captured-pieces`}>
      {capturedPiecesIcons}
    </div>
  );
};

PlayerCapturedPieces.defaultProps = {
  piecesColor: "w",
};
