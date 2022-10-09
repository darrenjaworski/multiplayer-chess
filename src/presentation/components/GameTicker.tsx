import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { useAppSelector } from "../../state-management/hooks";
import { getPGN } from "../../state-management/slices/game";
import { GameHistory } from "./GameHistory";
import { Modal } from "./Modal";

const HistoryBar = styled.div`
  width: 100%;
  height: 2rem;
  max-height: 2rem;
  background: steelblue;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`;

const FixedShowHistoryButton = styled.button`
  margin: 0 0.5rem;
`;

const PGNOverflow = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  padding-right: 0.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const GameTicker = () => {
  const [historyModalIsOpen, setHistoryModalOpen] = useState(false);
  const scrollElement = useRef(null);
  const pgn = useAppSelector(getPGN);

  useEffect(() => {
    if (!scrollElement?.current) return;
    // @ts-ignore
    scrollElement.current.scrollLeft = scrollElement.current.scrollWidth;
  });

  const handleModalOpen = () => {
    setHistoryModalOpen(true);
  };

  const handleModalClose = () => {
    setHistoryModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={historyModalIsOpen} handleClose={handleModalClose}>
        <div data-testid="full-history-modal">
          <GameHistory />
          <button onClick={handleModalClose} title="close history modal">
            close full history
          </button>
        </div>
      </Modal>
      <HistoryBar>
        <FixedShowHistoryButton
          title="show game history details"
          disabled={pgn ? false : true}
          onClick={handleModalOpen}
        >
          <FaHistory />
        </FixedShowHistoryButton>
        <PGNOverflow ref={scrollElement} data-testid="pgn-ticker">
          {pgn ? pgn : "pgn will display here when you start playing"}
        </PGNOverflow>
      </HistoryBar>
    </>
  );
};
