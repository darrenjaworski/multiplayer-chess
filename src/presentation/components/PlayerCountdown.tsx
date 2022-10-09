import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaClock, FaUserClock } from "react-icons/fa";

interface PlayerCountdownProps {
  startTime: number;
  turn: boolean;
}

const CenteredClock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: centered;
  gap: 0.25rem;
`;

function getMinSec(remaining: number): string {
  const remainingMin = Math.floor(remaining / 60);
  const remainingSec = remaining % 60;
  const displayMin = remainingMin > 0 ? `${remainingMin}:` : "";
  const displaySec =
    remainingSec.toString().length == 1 ? `0${remainingSec}` : remainingSec;
  return `${displayMin}${displaySec}`;
}

export const PlayerCountdown = (props: PlayerCountdownProps) => {
  const { startTime, turn } = props;
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

  return (
    <CenteredClock>
      {turn ? <FaUserClock /> : <FaClock />}
      {getMinSec(timeLeft)}
    </CenteredClock>
  );
};

PlayerCountdown.defaultProps = {
  startTime: 10,
  turn: false,
};
