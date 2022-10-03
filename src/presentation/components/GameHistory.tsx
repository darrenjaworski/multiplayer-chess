import styled from "@emotion/styled";
import type { PieceSymbol } from "chess.js";
import { useAppSelector } from "../../state-management/hooks";
import { getHistory, getPGN } from "../../state-management/slices/game";

const StyledGameHistory = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  max-width: 15rem;
`;

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
  return (
    <StyledGameHistory>
      <h2>Moves history:</h2>
      {gameHistory.map((move, i) => {
        const id = `game-moves-history-${i}`;
        const moveColor = move.color === "w" ? "white -" : "black -";

        let captureText = "";
        if (move?.captured) {
          captureText = ` takes ${PieceToEnglishMap[move.captured]}`;
        }
        if (move?.flags === 'c') {
            captureText += ', check';
        }

        return (
          <div key={id} data-testid={id}>{`${moveColor} ${
            PieceToEnglishMap[move.piece]
          }${captureText} - ${move.from} => ${move.to} (${move.san})`}</div>
        );
      })}
      <h2>PGN:</h2>
      <div data-testid="game-history-pgn">{pgn}</div>
    </StyledGameHistory>
  );
};
