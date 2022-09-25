import styled from "@emotion/styled";
import { Chessboard } from "../components/Chessboard";

interface GameProps {}

const GameScreen = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlayerName = styled.h2`
  color: red;
`;

export const Game = (props: GameProps) => {
  return (
    <GameScreen data-testid={"game"}>
      <PlayerName data-testid="top-player">top player name</PlayerName>
      <Chessboard />
      <PlayerName data-testid="bottom-player">bottom player name</PlayerName>
    </GameScreen>
  );
};
