import { Chess, Move } from "chess.js";
import { useState } from "react";
import {
  Chessboard as ReactChessboard,
  ChessBoardProps,
  CustomSquareStyles,
  Square,
} from "react-chessboard";

interface ChessboardProps extends ChessBoardProps {}

interface MoveTo extends Move {
  to: Square;
}

export const Chessboard = (props: ChessboardProps) => {
  const { id } = props;
  const [game, setGame] = useState(new Chess());
  const [validMoveStyles, setValidMoveStyles] = useState({});

  const handleMouseOver = (square: Square) => {
    const moves = game.moves({ square, verbose: true }) as MoveTo[];
    if (moves.length === 0) return;

    const hintStyles = {} as CustomSquareStyles;
    moves.forEach((move: MoveTo) => {
      hintStyles[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(255,255,255,.5) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.5) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });
    hintStyles[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setValidMoveStyles(hintStyles);
  };
  return (
    <ReactChessboard
      id={id || Date.now()}
      onMouseOverSquare={handleMouseOver}
      position={game.fen()}
      customSquareStyles={{ ...validMoveStyles }}
    />
  );
};
