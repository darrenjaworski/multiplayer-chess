import { useAppSelector } from "../../state-management/hooks";
import {
  getIsColorInCheckMate,
  getPlayers,
  getTurn,
} from "../../state-management/slices/game";
import { Button } from "../atoms/Button";
import { GameHistory } from "./GameHistory";
import { Modal } from "./Modal";

interface CompletionModalProps {
  handleClose: () => any;
  isOpen: boolean;
}

export const CompletionModal = (props: CompletionModalProps) => {
  const { isOpen } = props;
  const players = useAppSelector(getPlayers);

  const { username: wUsername } = players[0];
  const { username: bUsername } = players[1];

  const isWhiteCheckMated = useAppSelector(getIsColorInCheckMate("w"));
  const currentTurn = useAppSelector(getTurn);

  const getLoserText = (whiteCheckMate: boolean | undefined) => {
    if (!whiteCheckMate)
      return `${currentTurn === "w" ? wUsername : bUsername} has forfeited.`;

    return `Check mate ${whiteCheckMate ? wUsername : bUsername}.`;
  };

  return (
    <Modal isOpen={isOpen}>
      <>
        <h1>The Game is over!</h1>
        <h2>{getLoserText(isWhiteCheckMated)}</h2>
        <Button>Reset the game</Button>
        <GameHistory />
      </>
    </Modal>
  );
};

CompletionModal.defaultProps = {
  handleClose: undefined,
  isOpen: false,
};
