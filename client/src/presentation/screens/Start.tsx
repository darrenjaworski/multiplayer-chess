import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { FaChessKing } from "react-icons/fa";
import { Form } from "react-router-dom";
import { GAME_MODES } from "../../state-management/slices/game";
import { Button } from "../atoms/Button";
import { useBoardTheme } from "../theme/theme";

// TODO refactor these styles
const GameScreen = styled(Form)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
  gap: 2rem;
`;

const PlayerSelection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
`;

const GameModeSelection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
`;

const CenteredRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SpacedRadio = styled.div`
  input {
    margin: 0.5rem;
  }
`;

// TODO refactor to remove ts-ignores
const BlackPiecePreview = styled.div`
  background: ${(props) => {
    // @ts-ignore
    return props.background;
  }};
  padding: 9px;
  border-radius: 50%;
  border: 3px solid
    ${(props) => {
      return props.color;
    }};
`;

const WhitePiecePreview = styled.div`
  background: ${(props) => {
    // @ts-ignore
    return props.background;
  }};
  padding: 0.75rem;
  border-radius: 50%;
`;

export const Start = () => {
  const [selectedMode, setSelectedMode] = useState(GAME_MODES[0].key);
  const boardThemes = useBoardTheme();

  const handleSelectedModeUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(Number(event.target.value));
  };

  return (
    <GameScreen method="post" action="/game" data-testid="start">
      <CenteredRow>
        <h1 data-testid="start-headline">Let's play some chess!</h1>
      </CenteredRow>
      <PlayerSelection>
        <BlackPiecePreview
          /* @ts-ignore */
          background={boardThemes.colors.lightSquare}
          color={boardThemes.colors.darkPieces}
        >
          <FaChessKing color={boardThemes.colors.darkPieces} size="5rem" />
        </BlackPiecePreview>
        <label htmlFor="player-two">Dark pieces player name</label>
        <input
          maxLength={25}
          type="text"
          required
          name="playerTwo"
          id="player-two"
          data-testid="black-pieces-player-name"
        />
      </PlayerSelection>
      <PlayerSelection>
        {/* @ts-ignore */}
        <WhitePiecePreview background={boardThemes.colors.darkSquare}>
          <FaChessKing color={boardThemes.colors.lightPieces} size="5rem" />
        </WhitePiecePreview>
        <label htmlFor="player-one">Light pieces player name</label>
        <input
          maxLength={25}
          type="text"
          required
          name="playerOne"
          id="player-one"
          data-testid="white-pieces-player-name"
        />
      </PlayerSelection>
      <GameModeSelection>
        <fieldset>
          <legend>Select a game mode:</legend>

          {GAME_MODES.map((mode, i) => {
            const key = mode.key;
            const label = mode.label;
            const id = `GameMode${key}`;
            return (
              <SpacedRadio key={`${key}-${i}`}>
                <input
                  type="radio"
                  id={id}
                  name="mode"
                  value={mode.key}
                  checked={mode.key === selectedMode}
                  onChange={handleSelectedModeUpdate}
                  data-testid={`${mode.key}-mode-selection`}
                />
                <label htmlFor={id}>{label}</label>
              </SpacedRadio>
            );
          })}
        </fieldset>
      </GameModeSelection>
      <CenteredRow>
        <Button type="submit" variant="contained">
          start the game
        </Button>
      </CenteredRow>
    </GameScreen>
  );
};
