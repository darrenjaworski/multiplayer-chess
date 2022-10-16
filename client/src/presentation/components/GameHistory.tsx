import type { PieceSymbol } from "chess.js";
import { useAppSelector } from "../../state-management/hooks";
import { getFEN, getHistory, getPGN } from "../../state-management/slices/game";

type PieceToEnglish = {
  [key in PieceSymbol]: string;
};

const PieceToEnglishMap: PieceToEnglish = {
  p: "pawn",
  n: "knight",
  k: "king",
  q: "queen",
  r: "rook",
  b: "bishop",
};

export const GameHistory = () => {
  const gameHistory = useAppSelector(getHistory);
  const pgn = useAppSelector(getPGN);
  const fen = useAppSelector(getFEN);
  return (
    <>
      <h2>Moves history:</h2>
      {gameHistory.map((move, i) => {
        const id = `game-moves-history-${i}`;
        const moveColorText = move.color === "w" ? "white -" : "black -";
        const pieceNameText = PieceToEnglishMap[move.piece];

        const didCapture = move?.captured;
        const didCheck = move.san.slice(-1) === "+";

        let captureText = "";
        if (didCapture) {
          captureText += ` takes ${
            PieceToEnglishMap[move.captured as PieceSymbol]
          }`;
        }
        if (didCheck) {
          captureText += ` check`;
        }

        const moveDetails = `${moveColorText} ${pieceNameText}${captureText} - ${move.from} => ${move.to} (${move.san})`;

        return (
          <p key={id} data-testid={id}>
            {moveDetails}
          </p>
        );
      })}
      <h2>PGN:</h2>
      <p data-testid="game-history-pgn">{pgn}</p>
      <h2>FEN:</h2>
      <p data-testid="game-history-fen">{fen}</p>
    </>
  );
};
