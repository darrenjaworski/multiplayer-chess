import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void | undefined;
  children: JSX.Element | React.ReactElement;
}

const modalStyles = {
  overlay: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0, .75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80%",
    maxWidth: "80%",
    overflow: "scroll",
  },
};

export const Modal = (props: ModalProps) => {
  const { isOpen, handleClose, children } = props;
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
    >
      {children}
    </ReactModal>
  );
};
