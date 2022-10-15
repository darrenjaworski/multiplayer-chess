import { useAppSelector } from "../../state-management/hooks";
import {
  getIsColorInCheckMate,
  getPlayers,
} from "../../state-management/slices/game";
import { Button } from "../atoms/Button";
import { GameHistory } from "./GameHistory";
import { Modal } from "./Modal";

interface CompletionModalProps {
  handleClose: () => any;
  isOpen: boolean;
}

export const CompletionModal = (props: CompletionModalProps) => {
  const { handleClose, isOpen } = props;
  const players = useAppSelector(getPlayers);
  const isWhiteCheckMated = useAppSelector(getIsColorInCheckMate("w"));

  console.log(isWhiteCheckMated);

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <>
        <h1>The Game is over!</h1>
        <h2>
          {isWhiteCheckMated
            ? `Check mate ${players[0].username}.`
            : `Check mate ${players[1].username}. `}
        </h2>
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
