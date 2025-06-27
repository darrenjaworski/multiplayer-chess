import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";

const MenuScreen = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const Start = () => {
  const navigate = useNavigate();

  return (
    <MenuScreen data-testid="start">
      <h1>Welcome to Multiplayer Chess</h1>
      <Button onClick={() => navigate("/game/local")}>Play locally</Button>
      <Button onClick={() => navigate("/game/computer")}>
        Play against computer
      </Button>
      <Button onClick={() => navigate("/join")}>
        Create or join online game
      </Button>
    </MenuScreen>
  );
};
