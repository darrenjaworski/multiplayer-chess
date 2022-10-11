import styled from "@emotion/styled";
import { PieceSymbol } from "chess.js";
import {
  FaChessBishop,
  FaChessKnight,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import { Modal } from "./Modal";

const PromotionPieces = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

interface PromotionModalProps {
  handleClose: () => any;
  isOpen: boolean;
  promotePiece: (piece: PieceSymbol) => any;
}

export const PromotionModal = (props: PromotionModalProps) => {
  const { handleClose, isOpen, promotePiece } = props;
  const iconSize = "3rem";

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div data-testid="promotion-modal">
        <h2>Please select a piece for promotion:</h2>
        <PromotionPieces>
          <FaChessQueen size={iconSize} onClick={() => promotePiece("q")} />
          <FaChessBishop size={iconSize} onClick={() => promotePiece("b")} />
          <FaChessKnight size={iconSize} onClick={() => promotePiece("n")} />
          <FaChessRook size={iconSize} onClick={() => promotePiece("r")} />
        </PromotionPieces>
      </div>
    </Modal>
  );
};

PromotionModal.defaultProps = {
  handleClose: undefined,
  isOpen: false,
  promotePiece: undefined,
};
