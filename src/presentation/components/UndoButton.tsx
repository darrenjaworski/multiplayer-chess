import type { Color } from "chess.js";
import { useEffect, useState } from "react";

interface UndoButtonProps {
  handleClick: () => void;
  disabled: boolean;
  color: Color;
  children: JSX.Element | React.ReactElement | string;
}

type TimeoutRefState = undefined | NodeJS.Timeout;

const defaultTimeoutState: TimeoutRefState = undefined;

export const UndoButton = (props: UndoButtonProps) => {
  const { handleClick, disabled, color, children } = props;
  const [buttonTimeout, setButtonTimeout] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState(
    defaultTimeoutState as TimeoutRefState
  );

  useEffect(() => {
    if (disabled) return;

    const timeout = setTimeout(() => {
      setButtonTimeout(true);
      clearTimeoutRef(timeout);
    }, 5000);
    setTimeoutRef(timeout);
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
      disabled={disabled || buttonTimeout}
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
};
