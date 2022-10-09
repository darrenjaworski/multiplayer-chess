import styled from "@emotion/styled";
import { Color } from "chess.js";
import { useEffect, useState } from "react";
import { FaClock, FaUserClock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  getGameStarted,
  getTurn,
  updatePlayerClock,
} from "../../state-management/slices/game";

interface PlayerCountdownProps {
  startTime: number;
  turn: boolean;
  color: Color;
}

interface CenteredClockProps {
  turn: boolean;
}

const CenteredClock = styled.div<CenteredClockProps>`
  display: flex;
  flex-direction: row;
  justify-content: centered;
  gap: 0.25rem;
  color: ${(props) => (props.turn ? "red" : "steelblue")};
`;

CenteredClock.defaultProps = {
  turn: false,
};

export function getMinSec(remaining: number): string {
  if (remaining < 0) return "";
  const remainingMin = Math.floor(remaining / 60);
  const remainingSec = remaining % 60;
  const displayMin = remainingMin > 0 ? `${remainingMin}:` : "";
  const displaySec =
    remainingSec.toString().length == 1 ? `0${remainingSec}` : remainingSec;
  return `${displayMin}${displaySec}`;
}

export const PlayerCountdown = (props: PlayerCountdownProps) => {
  const { startTime, turn, color } = props;
  const gameTurn = useAppSelector(getTurn);
  const gameStarted = useAppSelector(getGameStarted);

  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState(startTime);

  useEffect(() => {
    if (!turn) return;

    const playerClock = setInterval(() => {
      if (timeLeft < 1) {
        clearInterval(playerClock);
        return;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(playerClock);
    };
  });

  useEffect(() => {
    if (!gameStarted) return;
    if (gameTurn === color) return;
    dispatch(updatePlayerClock(timeLeft));
  }, [gameTurn]);

  return (
    <CenteredClock turn={turn} data-testid={`player-${color}-countdown`}>
      {turn ? <FaUserClock /> : <FaClock />}
      <span data-testid={`player-${color}-countdown-remaining`}>{getMinSec(timeLeft)}</span>
    </CenteredClock>
  );
};

PlayerCountdown.defaultProps = {
  startTime: 300,
  turn: false,
  color: "w",
};
