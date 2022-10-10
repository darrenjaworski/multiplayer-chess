import type { Color } from "chess.js";
import { useEffect, useState } from "react";

interface UndoButtonProps {
  handleClick: () => void;
  disabled: boolean;
  color: Color;
  children: JSX.Element | React.ReactElement | string;
  turn: Color;
}

type TimeoutRefState = undefined | NodeJS.Timeout;

const defaultTimeoutState: TimeoutRefState = undefined;

export const UndoButton = (props: UndoButtonProps) => {
  const { handleClick, disabled, color, children, turn } = props;
  const [buttonTimeout, setButtonTimeout] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState(
    defaultTimeoutState as TimeoutRefState
  );
  // TODO actually get working!

  useEffect(() => {
    if (disabled) return;

    const timeout = setTimeout(() => {
      setButtonTimeout(true);
      clearTimeoutRef(timeout);
    }, 5000);

    setTimeoutRef(timeout);

    return function cleanup() {
      setButtonTimeout(false);
      if (timeoutRef) clearTimeoutRef(timeoutRef);
    };
  }, [disabled]);

  const handleUndoWithtimer = () => {
    if (timeoutRef) clearTimeoutRef(timeoutRef);
    handleClick();
  };

  const clearTimeoutRef = (ref: NodeJS.Timeout) => {
    setTimeoutRef(undefined);
    clearTimeout(ref);
  };

  return (
    <button
      data-testid={`${color}-undo`}
      disabled={disabled}
      onClick={handleUndoWithtimer}
      title="undo previous move"
    >
      {children}
    </button>
  );
};

UndoButton.defaultProps = {
  disabled: true,
  color: "w",
  children: "undo last move",
  turn: "w",
};
