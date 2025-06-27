import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { FaChessKing } from "react-icons/fa";
import { Form, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { GAME_MODES } from "../../state-management/slices/game";
import { Button } from "../atoms/Button";
import { useBoardTheme } from "../theme/theme";

interface StyledPiecePreviewProps {
  background: string;
}

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

const BlackPiecePreview = styled.div<StyledPiecePreviewProps>`
  background: ${(props) => {
    return props.background;
  }};
  padding: 9px;
  border-radius: 50%;
  border: 3px solid
    ${(props) => {
      return props.color;
    }};
`;

const WhitePiecePreview = styled.div<StyledPiecePreviewProps>`
  background: ${(props) => {
    return props.background;
  }};
  padding: 0.75rem;
  border-radius: 50%;
`;

export const Start = () => {
  const [selectedMode, setSelectedMode] = useState(GAME_MODES[0].key);
  const { colors: boardColors } = useBoardTheme();
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [preferredColor, setPreferredColor] = useState<"white" | "black">(
    "white"
  );
  const navigate = useNavigate();

  const handleSelectedModeUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(Number(event.target.value));
  };

  const gameId = uuid();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, let player one be the one who starts the game
    navigate(`/game/${gameId}`, {
      state: {
        playerName: preferredColor === "white" ? playerOne : playerTwo,
        preferredColor,
      },
    });
  };

  // BUG game id can get out of sync with browser back/forward buttons
  return (
    <GameScreen
      method="post"
      action="#"
      data-testid="start"
      onSubmit={handleSubmit}
    >
      <input type="hidden" value={gameId} name="gameId" id="gameId" />
      <CenteredRow>
        <h1 data-testid="start-headline">Let's play some chess!</h1>
      </CenteredRow>
      <PlayerSelection>
        <BlackPiecePreview
          background={boardColors.lightSquare}
          color={boardColors.darkPieces}
        >
          <FaChessKing color={boardColors.darkPieces} size="5rem" />
        </BlackPiecePreview>
        <label htmlFor="player-two">Dark pieces player name</label>
        <input
          maxLength={25}
          type="text"
          required
          name="playerTwo"
          id="player-two"
          data-testid="black-pieces-player-name"
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.target.value)}
        />
        <input
          type="radio"
          name="preferredColor"
          value="black"
          checked={preferredColor === "black"}
          onChange={() => setPreferredColor("black")}
        />
        <label>Play as Black</label>
      </PlayerSelection>
      <PlayerSelection>
        <WhitePiecePreview background={boardColors.darkSquare}>
          <FaChessKing color={boardColors.lightPieces} size="5rem" />
        </WhitePiecePreview>
        <label htmlFor="player-one">Light pieces player name</label>
        <input
          maxLength={25}
          type="text"
          required
          name="playerOne"
          id="player-one"
          data-testid="white-pieces-player-name"
          value={playerOne}
          onChange={(e) => setPlayerOne(e.target.value)}
        />
        <input
          type="radio"
          name="preferredColor"
          value="white"
          checked={preferredColor === "white"}
          onChange={() => setPreferredColor("white")}
        />
        <label>Play as White</label>
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
