import styled from "@emotion/styled";
import type { Color } from "chess.js";
import React from "react";
import { FaChessKnight } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  getGameStarted,
  getIsColorInCheck,
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
  const dispatch = useAppDispatch();
  const { player, piecesColor } = props;
  const { username, eloScore } = player;
  const gameturn = useAppSelector(getTurn);
  const isPlayerInCheck = useAppSelector(getIsColorInCheck(piecesColor));

  const isPlayersTurn = gameturn === piecesColor;
  const gameHasStarted = useAppSelector(getGameStarted);
  const shouldDisable = isPlayersTurn || !gameHasStarted;
  const handleUndoClick = (_event: React.MouseEvent) => {
    dispatch(undoMove(piecesColor));
  };

  return (
    <PlayerContainer data-testid="player">
      <PlayerName>
        <h2 data-testid="player-name">
          <>
            {username}
            {isPlayerInCheck && <span> - check</span>}
            {isPlayersTurn && (
              <TurnIcon data-testid={"player-turn-indicator"} />
            )}
          </>
        </h2>
        <span data-testid="player-ranking">Elo: {eloScore}</span>
      </PlayerName>
      <PlayerCapturedPieces piecesColor={piecesColor} />
      <UndoButton disabled={shouldDisable} onClick={handleUndoClick}>
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
