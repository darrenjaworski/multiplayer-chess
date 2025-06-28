import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state-management/hooks";
import {
  GameTypes,
  updateMode,
  updatePlayers,
} from "../../state-management/slices/game";
import { Button } from "../atoms/Button";

const CenteredForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 1.5rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

export function LocalGameSetup() {
  const [whiteName, setWhiteName] = useState("");
  const [blackName, setBlackName] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Set players and mode in Redux for local play
    dispatch(
      updatePlayers([
        { username: whiteName, eloScore: 1, color: "w", type: 0 },
        { username: blackName, eloScore: 2, color: "b", type: 0 },
      ])
    );
    dispatch(updateMode(0)); // 0 = untimed
    // Set game type to local
    dispatch({ type: "game/type", payload: GameTypes.humanVsHumanLocal });
    navigate("/game/local/play");
  }

  return (
    <CenteredForm onSubmit={handleSubmit} data-testid="local-game-setup-form">
      <FieldGroup>
        <label htmlFor="white-player">White Player Name</label>
        <input
          id="white-player"
          value={whiteName}
          onChange={(e) => setWhiteName(e.target.value)}
          placeholder="John Doe"
        />
      </FieldGroup>
      <FieldGroup>
        <label htmlFor="black-player">Black Player Name</label>
        <input
          id="black-player"
          value={blackName}
          onChange={(e) => setBlackName(e.target.value)}
          placeholder="Mary Jane"
        />
      </FieldGroup>
      <Button type="submit">Start Game</Button>
    </CenteredForm>
  );
}
