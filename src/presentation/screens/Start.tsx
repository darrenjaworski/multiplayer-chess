import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { FaChessKing } from "react-icons/fa";
import { Form } from "react-router-dom";
import { GAME_MODES } from "../../state-management/slices/game";

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

export const Start = () => {
  const [selectedMode, setSelectedMode] = useState(GAME_MODES[0].key);

  const handleSelectedModeUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(Number(event.target.value));
  };

  return (
    <GameScreen method="post" action="/game" data-testid="start">
      <CenteredRow>
        <h1>Let's play some chess!</h1>
      </CenteredRow>
      <PlayerSelection>
        <div
          style={{
            background: "black",
            padding: "0.75rem",
            borderRadius: "50%",
          }}
        >
          <FaChessKing color="white" style={{ fontSize: "5rem" }} />
        </div>
        <label htmlFor="player-one">White player name</label>
        <input
          maxLength={25}
          type="text"
          required
          name="playerOne"
          id="player-one"
        />
      </PlayerSelection>
      <PlayerSelection>
        <div
          style={{
            background: "white",
            padding: "9px",
            borderRadius: "50%",
            border: "3px solid black",
          }}
        >
          <FaChessKing style={{ fontSize: "5rem" }} />
        </div>
        <label htmlFor="player-two">Black player name</label>
        <input
          maxLength={25}
          type="text"
          required
          name="playerTwo"
          id="player-two"
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
                />
                <label htmlFor={id}>{label}</label>
              </SpacedRadio>
            );
          })}
        </fieldset>
      </GameModeSelection>
      <CenteredRow>
        <button type="submit">start the game</button>
      </CenteredRow>
    </GameScreen>
  );
};