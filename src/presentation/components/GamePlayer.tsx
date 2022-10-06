import styled from "@emotion/styled";
import type { Color } from "chess.js";
import React from "react";
import { FaChessKnight } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  getGameStarted,
  getIsColorInCheck,
  getIsColorInCheckMate,
  getTurn,
  undoMove,
} from "../../state-management/slices/game";
import { Player } from "../screens/Game";
import { PlayerCapturedPieces } from "./PlayerCapturedPieces";

interface GamePlayerProps {
  player: Player;
  piecesColor: Color;
}

const PlayerContainer = styled.div`
  color: steelblue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PlayerName = styled.div`
  > h2 {
    margin: 0;
  }
`;

const TurnIcon = styled(FaChessKnight)`
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const UndoButton = styled.button``;

export const GamePlayer = (props: GamePlayerProps) => {
  const { player, piecesColor } = props;
  const { username, eloScore } = player;

  const dispatch = useAppDispatch();
  const gameturn = useAppSelector(getTurn);
  const isPlayerInCheck = useAppSelector(getIsColorInCheck(piecesColor));
  const isPlayerCheckMated = useAppSelector(getIsColorInCheckMate(piecesColor));
  const gameHasStarted = useAppSelector(getGameStarted);

  const isPlayersTurn = gameturn === piecesColor;
  const shouldDisable = isPlayersTurn || !gameHasStarted;

  const handleUndoClick = (_event: React.MouseEvent) => dispatch(undoMove());

  return (
    <PlayerContainer data-testid="player">
      <PlayerName>
        <h2 data-testid="player-name">
          <>
            {username}
            {isPlayerInCheck && !isPlayerCheckMated && <span data-testid="player-check"> - check</span>}
            {isPlayerCheckMated && <span data-testid="player-check-mate"> - check mate</span>}
            {isPlayersTurn && (
              <TurnIcon data-testid={"player-turn-indicator"} />
            )}
          </>
        </h2>
        <span data-testid="player-ranking">Elo: {eloScore}</span>
      </PlayerName>
      <PlayerCapturedPieces piecesColor={piecesColor} />
      <UndoButton
        data-testid={`${piecesColor}-undo`}
        disabled={shouldDisable}
        onClick={handleUndoClick}
        title="undo previous move"
      >
        undo last move
      </UndoButton>
    </PlayerContainer>
  );
};

GamePlayer.defaultProps = {
  player: {
    username: "foo",
    eloScore: 1,
  },
  piecesColor: "w",
};
