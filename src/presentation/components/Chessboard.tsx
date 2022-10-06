import { Chess, Move, Piece, PieceSymbol } from "chess.js";
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
import { PromotionModal } from "./PromotionModal";

interface ChessboardProps extends ChessBoardProps {}

interface MoveTo extends Move {
  to: Square;
}

export const Chessboard = (props: ChessboardProps) => {
  const { id } = props;
  const gameFEN = useAppSelector(getFEN);
  const dispatch = useAppDispatch();

  const [promotionFromTo, setPromotionFromTo] = useState({ from: "", to: "" });
  const [isPromotionModalOpen, setPromotionModalOpen] = useState(false);

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
    const moves = localGame.moves({
      square: sourceSquare,
      verbose: true,
    }) as MoveTo[];
    const canPromote = moves.some((move) => move?.promotion);

    if (canPromote) {
      setPromotionFromTo({ from: sourceSquare, to: targetSquare });
      setPromotionModalOpen(true);
      return false;
    }

    return commitMove(sourceSquare, targetSquare);
  };

  const commitMove = (
    sourceSquare: Square,
    targetSquare: Square,
    promotion: PieceSymbol | null = null
  ): boolean => {
    const localGame = new Chess(gameFEN);
    const moveAttempt = { from: sourceSquare, to: targetSquare } as Move;

    if (promotion) moveAttempt.promotion = promotion;

    const didMove = localGame.move(moveAttempt);
    if (!didMove) return false;

    if (didMove?.captured) {
      const capturedPiece: Piece = {
        color: didMove.color === "w" ? "b" : "w",
        type: didMove.captured,
      };
      dispatch(addCaptured(capturedPiece));
    }

    clearValidMovesStyles();
    const move = localGame.history({ verbose: true })[0] as Move;
    dispatch(updateGame({ fen: localGame.fen(), move }));
    return true;
  };

  const handlePromotionSelection = (piece: PieceSymbol) => {
    setPromotionModalOpen(false);
    setPromotionFromTo({ from: "", to: "" });
    // @ts-ignore
    commitMove(promotionFromTo.from, promotionFromTo.to, piece);
  };

  const handlePromotionModalClose = () => {
    setPromotionModalOpen(false);
  };

  return (
    <>
      <PromotionModal
        handleClose={handlePromotionModalClose}
        isOpen={isPromotionModalOpen}
        promotePiece={handlePromotionSelection}
      />
      <ReactChessboard
        id={id}
        onMouseOverSquare={handleMouseOver}
        onMouseOutSquare={handleMouseOut}
        onPieceDrop={handlePieceDrop}
        position={gameFEN}
        customSquareStyles={{ ...validMoveStyles }}
      />
    </>
  );
};

Chessboard.defaultProps = {
  id: Date.now() * Math.random(),
};
