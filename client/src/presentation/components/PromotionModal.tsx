import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { PieceSymbol } from "chess.js";
import {
  FaChessBishop,
  FaChessKnight,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import useSound from "use-sound";
import { useAppSelector } from "../../state-management/hooks";
import { getShouldPlaySounds } from "../../state-management/slices/settings";
import { piecePromotionSound } from "../soundEffects";
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

  const [playPromotion] = useSound(piecePromotionSound);
  const shouldPlaySounds = useAppSelector(getShouldPlaySounds);
  const theme = useTheme();

  const handlePromotion = (piece: "q" | "b" | "n" | "r") => {
    if (shouldPlaySounds) playPromotion();
    promotePiece(piece);
  };

  const iconSize = "3rem";

  const iconProps = {
    size: iconSize,
    color: theme.colors.text,
  };

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div data-testid="promotion-modal">
        <h2>Please select a piece for promotion:</h2>
        <PromotionPieces>
          <FaChessQueen {...iconProps} onClick={() => handlePromotion("q")} />
          <FaChessBishop {...iconProps} onClick={() => handlePromotion("b")} />
          <FaChessKnight {...iconProps} onClick={() => handlePromotion("n")} />
          <FaChessRook {...iconProps} onClick={() => handlePromotion("r")} />
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
