import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  getEndGameResult,
  getPlayers,
  getTurn,
  resetGame,
} from "../../state-management/slices/game";
import { Button } from "../atoms/Button";
import { GameHistory } from "./GameHistory";
import { Modal } from "./Modal";

interface CompletionModalProps {
  handleClose: () => any;
  isOpen: boolean;
}

const ConfirmationButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  > button:last-child {
    margin-left: 0.5rem;
  }
`;

export const CompletionModal = (props: CompletionModalProps) => {
  const { isOpen, handleClose } = props;
  const players = useAppSelector(getPlayers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { username: wUsername } = players[0];
  const { username: bUsername } = players[1];

  const endgameStatus = useAppSelector(getEndGameResult);
  const currentTurn = useAppSelector(getTurn);

  const getLoserText = () => {
    const isWhitesTurn = currentTurn === "w";
    if (endgameStatus.isCheckMate) {
      return `Check mate ${isWhitesTurn ? wUsername : bUsername}.`;
    }

    if (endgameStatus.isDraw) {
      return `The game was a draw.`;
    }

    if (endgameStatus.isForfeit) {
      return `${isWhitesTurn ? wUsername : bUsername} has forfeited.`;
    }

    if (endgameStatus.isPlayerTimeout) {
      return `${isWhitesTurn ? wUsername : bUsername} has run out of time.`;
    }

    if (endgameStatus.isStalemate) {
      return `The game was a stalemate`;
    }

    return;
  };

  const handleBackToStart = () => {
    dispatch(resetGame());
    navigate("/");
  };

  const handleGameReset = () => {
    dispatch(resetGame());
    handleClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <>
        <h1>The Game is over!</h1>
        <h2 data-testid="endgame-text">{getLoserText()}</h2>
        <ConfirmationButtons>
          <Button onClick={handleGameReset}>Reset the game</Button>
          <Button onClick={handleBackToStart}>Set up a new game</Button>
        </ConfirmationButtons>
        <GameHistory />
      </>
    </Modal>
  );
};

CompletionModal.defaultProps = {
  handleClose: undefined,
  isOpen: false,
};
