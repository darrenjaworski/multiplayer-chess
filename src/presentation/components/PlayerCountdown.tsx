import { useEffect, useState } from "react";

interface PlayerCountdownProps {
  startTime: number;
  turn: boolean;
}

function getMinSec(remaining: number): string {
  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  return `${min}:${sec}`;
}

export const PlayerCountdown = (props: PlayerCountdownProps) => {
  const { startTime, turn } = props;
  const [timeLeft, setTimeLeft] = useState(startTime);
  useEffect(() => {
    if (!turn) return;

    const playerClock = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(playerClock);
    };
  });

  return <span>{getMinSec(timeLeft)}</span>;
};

PlayerCountdown.defaultProps = {
  startTime: 300,
  turn: false,
};
