import { Modal } from "./Modal";

interface CompletionModalProps {
  handleClose: () => any;
  isOpen: boolean;
}

export const CompletionModal = (props: CompletionModalProps) => {
  const { handleClose, isOpen } = props;
  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div>The Game is over!</div>
    </Modal>
  );
};

CompletionModal.defaultProps = {
  handleClose: undefined,
  isOpen: false,
};
