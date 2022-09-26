import styled from "@emotion/styled";
import { Player } from "../screens/Game";

interface GamePlayerProps {
  player: Player;
}

const PlayerContainer = styled.div`
  color: steelblue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PlayerName = styled.div`
  > h2 {
    margin: 0;
  }
`;

const UndoButton = styled.button``;

export const GamePlayer = (props: GamePlayerProps) => {
  const { player } = props;
  return (
    <PlayerContainer data-testid="player">
      <PlayerName>
        <h2 data-testid="player-name">{player.username}</h2>
        <span data-testid="player-ranking">Elo: {player.eloScore}</span>
      </PlayerName>
      <UndoButton>undo last move</UndoButton>
    </PlayerContainer>
  );
};
