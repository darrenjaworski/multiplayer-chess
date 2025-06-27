import { useTheme } from "@emotion/react";
import React from "react";
import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void | undefined;
  children: React.ReactElement;
}

// Only set app element in browser (not in test/JSDOM)
if (typeof document !== "undefined") {
  ReactModal.setAppElement("#root");
}

export const Modal = (props: ModalProps) => {
  const { isOpen, handleClose, children } = props;
  const theme = useTheme();

  let modalStyles = {
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
      background: theme.background,
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={
        typeof process !== "undefined" && process.env.NODE_ENV === "test"
          ? false
          : undefined
      }
    >
      {children}
    </ReactModal>
  );
};
