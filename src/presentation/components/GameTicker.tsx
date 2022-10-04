import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../state-management/hooks";
import { getPGN } from "../../state-management/slices/game";

const HistoryBar = styled.div`
  width: 100%;
  height: 2rem;
  max-height: 2rem;
  overflow-x: scroll;
  background: steelblue;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  white-space: nowrap;
`;

export const GameTicker = () => {
  const scrollElement = useRef(null);
  const pgn = useAppSelector(getPGN);
  useEffect(() => {
    if (!scrollElement?.current) return;
    // @ts-ignore
    scrollElement.current.scrollLeft = scrollElement.current.scrollWidth;
  });
  return <HistoryBar ref={scrollElement}>{pgn}</HistoryBar>;
};
