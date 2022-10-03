import { Chess, Move, Piece } from "chess.js";
import { useState } from "react";
import {
  Chessboard as ReactChessboard,
  ChessBoardProps,
  CustomSquareStyles,
  Pieces,
  Square,
} from "react-chessboard";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  addCaptured,
  getFEN,
  updateGame,
} from "../../state-management/slices/game";

interface ChessboardProps extends ChessBoardProps {}

interface MoveTo extends Move {
  to: Square;
}

export const Chessboard = (props: ChessboardProps) => {
  const { id } = props;
  const gameFEN = useAppSelector(getFEN);
  const dispatch = useAppDispatch();

  const [validMoveStyles, setValidMoveStyles] = useState(
    {} as CustomSquareStyles
  );

  const clearValidMovesStyles = (): void => {
    if (Object.keys(validMoveStyles).length === 0) return;

    setValidMoveStyles({});
  };

  const handleMouseOver = (square: Square) => {
    const localGame = new Chess(gameFEN);
    const moves = localGame.moves({ square, verbose: true }) as MoveTo[];
    if (moves.length === 0) return;

    const initialHintStyles: CustomSquareStyles = {
      [square]: {
        background: "rgba(255, 255, 0, 0.4)",
      },
    };

    const hintStyles = moves.reduce(
      (validMoves: CustomSquareStyles, move: MoveTo): CustomSquareStyles => {
        const moveCanCapture =
          localGame.get(move.to) &&
          localGame.get(move.to).color !== localGame.get(square).color;

        validMoves[move.to] = {
          background: moveCanCapture
            ? "radial-gradient(circle, rgba(255,255,255,.5) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.5) 25%, transparent 25%)",
          borderRadius: "50%",
        };

        return validMoves;
      },
      initialHintStyles
    );

    setValidMoveStyles(hintStyles);
  };

  const handleMouseOut = (_square: Square) => clearValidMovesStyles();

  const handlePieceDrop = (
    sourceSquare: Square,
    targetSquare: Square,
    _piece: Pieces
  ): boolean => {
    const localGame = new Chess(gameFEN);
    const didMove = localGame.move({ from: sourceSquare, to: targetSquare });
    if (!didMove) return false;

    if (didMove?.captured) {
      const capturedPiece: Piece = {
        color: didMove.color === "w" ? "b" : "w",
        type: didMove.captured,
      };
      dispatch(addCaptured(capturedPiece));
    }

    clearValidMovesStyles();
    const move = localGame.history({ verbose: true })[0] as unknown as Move;
    dispatch(updateGame({ fen: localGame.fen(), move }));
    return true;
  };

  return (
    <ReactChessboard
      id={id || Date.now()}
      onMouseOverSquare={handleMouseOver}
      onMouseOutSquare={handleMouseOut}
      onPieceDrop={handlePieceDrop}
      position={gameFEN}
      customSquareStyles={{ ...validMoveStyles }}
    />
  );
};
