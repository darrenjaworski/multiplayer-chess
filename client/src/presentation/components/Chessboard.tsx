import { Chess, Move, Piece, PieceSymbol } from "chess.js";
import { useEffect, useState } from "react";
import {
  ChessBoardProps,
  CustomSquareStyles,
  Pieces,
  Chessboard as ReactChessboard,
  Square,
} from "react-chessboard";
import useSound from "use-sound";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  GameTypes,
  PlayerType,
  addCaptured,
  getFEN,
  getGameType,
  getIsEndgame,
  getPlayerInTurn,
} from "../../state-management/slices/game";
import { sendGameUpdate } from "../../state-management/slices/gameSockets";
import { getShouldPlaySounds } from "../../state-management/slices/settings";
import { movePieceSound, pieceCaptureSound } from "../soundEffects";
import { useBoardTheme } from "../theme/theme";
import { CompletionModal } from "./CompletionModal";
import { PromotionModal } from "./PromotionModal";

interface ChessboardProps extends ChessBoardProps {}

interface MoveTo extends Move {
  to: Square;
}

interface PromotionFromTo {
  from: Square | null;
  to: Square | null;
}

const initialPromotionFromTo: PromotionFromTo = {
  from: null,
  to: null,
};

export const Chessboard = (props: ChessboardProps) => {
  const gameFEN = useAppSelector(getFEN);
  const isEndgame = useAppSelector(getIsEndgame);
  const shouldPlaySounds = useAppSelector(getShouldPlaySounds);
  const dispatch = useAppDispatch();
  const [playPieceMove] = useSound(movePieceSound);
  const [playPieceCapture] = useSound(pieceCaptureSound);
  const playerInTurn = useAppSelector(getPlayerInTurn);
  const gameType = useAppSelector(getGameType);

  const disableMoves =
    playerInTurn?.type !== PlayerType.humanLocal ||
    gameType === GameTypes.observer;

  const [promotionFromTo, setPromotionFromTo] = useState(
    initialPromotionFromTo
  );
  const [isPromotionModalOpen, setPromotionModalOpen] = useState(false);
  const [validMoveStyles, setValidMoveStyles] = useState(
    {} as CustomSquareStyles
  );
  const [isCompletionModalOpen, setCompletionModalOpen] = useState(false);

  useEffect(() => {
    if (isEndgame) {
      setCompletionModalOpen(true);
    }
  }, [isEndgame]);

  const clearValidMovesStyles = (): void => {
    if (Object.keys(validMoveStyles).length === 0) return;

    setValidMoveStyles({});
  };

  const handleMouseOver = (square: Square) => {
    if (disableMoves) return;

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
    if (disableMoves) return false;

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
    promotion: PieceSymbol | null = null,
    playSound: boolean = true
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
      if (shouldPlaySounds) playPieceCapture();
    } else {
      if (shouldPlaySounds && playSound) playPieceMove();
    }

    clearValidMovesStyles();
    const move = localGame.history({ verbose: true })[0] as Move;
    dispatch(sendGameUpdate({ fen: localGame.fen(), move }));
    return true;
  };

  const handlePromotionSelection = (piece: PieceSymbol) => {
    setPromotionModalOpen(false);
    const { from, to } = promotionFromTo;
    if (!from || !to) return;

    commitMove(from, to, piece, false);
    setPromotionFromTo({ from: null, to: null });
  };

  const handlePromotionModalClose = () => {
    setPromotionModalOpen(false);
  };

  const boardTheme = useBoardTheme();

  return (
    <>
      <CompletionModal
        handleClose={() => setCompletionModalOpen(false)}
        isOpen={isCompletionModalOpen}
      />
      <PromotionModal
        handleClose={handlePromotionModalClose}
        isOpen={isPromotionModalOpen}
        promotePiece={handlePromotionSelection}
      />
      {/* BUG gameFEN with redux state is not updating board */}
      <ReactChessboard
        onMouseOverSquare={handleMouseOver}
        onMouseOutSquare={handleMouseOut}
        onPieceDrop={handlePieceDrop}
        position={gameFEN}
        customSquareStyles={{ ...validMoveStyles }}
        arePremovesAllowed={false}
        customDarkSquareStyle={boardTheme.customDarkSquareStyle}
        customLightSquareStyle={boardTheme.customLightSquareStyle}
        customPieces={boardTheme.customPieces}
        boardWidth={Math.min(window.innerWidth * 0.9, 560)}
        {...props}
      />
    </>
  );
};

Chessboard.defaultProps = {
  id: Math.round(Date.now() * Math.random()),
};
