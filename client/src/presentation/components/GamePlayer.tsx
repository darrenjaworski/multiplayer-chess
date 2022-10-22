import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import type { Color } from "chess.js";
import { useState } from "react";
import { BsFlagFill } from "react-icons/bs";
import { FaChessKnight } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  GameModes,
  GAME_MODES,
  getGameMode,
  getGameStarted,
  getIsColorInCheck,
  getIsColorInCheckMate,
  getTurn,
  undoMove,
  updatePlayerForfeit,
} from "../../state-management/slices/game";
import { Button } from "../atoms/Button";
import { Player } from "../pages/Game";
import { Modal } from "./Modal";
import { PlayerCapturedPieces } from "./PlayerCapturedPieces";
import { PlayerCountdown } from "./PlayerCountdown";
import { UndoButton } from "./UndoButton";

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

const ForfeitFlag = styled(BsFlagFill)`
  margin-left: 0.5rem;
  &:hover {
    color: black;
  }
`;

const ConfirmationButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  > button:last-child {
    margin-left: 0.5rem;
  }
`;

export const GamePlayer = (props: GamePlayerProps) => {
  const { player, piecesColor } = props;
  const { username, eloScore } = player;

  const [confirmForfeitModal, setConfirmForfeitModal] = useState(false);
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const gameTurn = useAppSelector(getTurn);
  const isPlayerInCheck = useAppSelector(getIsColorInCheck(piecesColor));
  const isPlayerCheckMated = useAppSelector(getIsColorInCheckMate(piecesColor));
  const gameHasStarted = useAppSelector(getGameStarted);
  const mode = useAppSelector(getGameMode);

  const isPlayersTurn = gameTurn === piecesColor;
  const shouldDisable = isPlayersTurn || !gameHasStarted;

  const handleUndoClick = () => dispatch(undoMove());

  const handleConfirmedForfeit = () => {
    dispatch(updatePlayerForfeit(piecesColor));
    setConfirmForfeitModal(false);
  };

  return (
    <PlayerContainer data-testid="player">
      <Modal
        isOpen={confirmForfeitModal}
        handleClose={() => {
          setConfirmForfeitModal(false);
        }}
      >
        <>
          <h2>{username}, are you sure you want to forfeit?</h2>
          <ConfirmationButtons>
            <Button onClick={() => setConfirmForfeitModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmedForfeit}>I'm sure</Button>
          </ConfirmationButtons>
        </>
      </Modal>
      <PlayerName>
        <h2 data-testid="player-name">
          <>
            {username}
            {isPlayersTurn && (
              <ForfeitFlag
                size={"1rem"}
                color={theme.colors.secondary}
                onClick={() => setConfirmForfeitModal(true)}
              />
            )}
            {isPlayerInCheck && !isPlayerCheckMated && (
              <span data-testid="player-check"> - check</span>
            )}
            {isPlayerCheckMated && (
              <span data-testid="player-check-mate"> - check mate</span>
            )}
            {isPlayersTurn && (
              <TurnIcon data-testid={"player-turn-indicator"} />
            )}
          </>
        </h2>
        <span data-testid="player-ranking">Elo: {eloScore}</span>
      </PlayerName>
      <PlayerCapturedPieces piecesColor={piecesColor} />
      {mode === GameModes.untimed && (
        <UndoButton
          handleClick={handleUndoClick}
          disabled={shouldDisable}
          color={piecesColor}
          turn={gameTurn}
        >
          undo last move
        </UndoButton>
      )}
      {mode !== GameModes.untimed && (
        <PlayerCountdown
          color={piecesColor}
          turn={isPlayersTurn && gameHasStarted}
          startTime={GAME_MODES[mode].time}
        />
      )}
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
