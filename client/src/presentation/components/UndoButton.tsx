import type { Color } from "chess.js";
import React, { useEffect, useState } from "react";
import { Button } from "../atoms/Button";

interface UndoButtonProps {
  handleClick: () => void;
  disabled: boolean;
  color: Color;
  children: React.ReactElement | string;
  turn: Color;
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
    if (disabled) {
      setButtonTimeout(false);
      if (timeoutRef) clearTimeoutRef(timeoutRef);
      return;
    }

    const timeout = setTimeout(() => {
      setButtonTimeout(true);
      clearTimeoutRef(timeout);
    }, 5000);

    setTimeoutRef(timeout);

    return function cleanup() {
      setButtonTimeout(false);
      if (timeoutRef) clearTimeoutRef(timeoutRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Button
      data-testid={`${color}-undo`}
      disabled={disabled || buttonTimeout}
      onClick={handleUndoWithtimer}
      title="undo previous move"
    >
      {children}
    </Button>
  );
};

UndoButton.defaultProps = {
  disabled: true,
  color: "w",
  children: "undo last move",
  turn: "w",
};
