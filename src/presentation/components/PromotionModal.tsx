import styled from "@emotion/styled";
import { PieceSymbol } from "chess.js";
import {
  FaChessBishop,
  FaChessKnight,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import { Modal } from "./Modal";

const promotionPieceStyles = {
  fontSize: "3rem",
};

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
  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div data-testid="promotion-modal">
        <h2>Please select a piece for promotion:</h2>
        <PromotionPieces>
          <FaChessQueen
            style={promotionPieceStyles}
            onClick={() => promotePiece("q")}
          />
          <FaChessBishop
            style={promotionPieceStyles}
            onClick={() => promotePiece("b")}
          />
          <FaChessKnight
            style={promotionPieceStyles}
            onClick={() => promotePiece("n")}
          />
          <FaChessRook
            style={promotionPieceStyles}
            onClick={() => promotePiece("r")}
          />
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
