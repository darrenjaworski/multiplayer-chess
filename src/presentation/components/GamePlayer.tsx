import styled from "@emotion/styled";
import { Player } from "../screens/Game";

interface GamePlayerProps {
  player: Player;
}

const PlayerName = styled.div`
  color: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GamePlayer = (props: GamePlayerProps) => {
  const { player } = props;
  return (
    <PlayerName data-testid="player">
      <div>
        <h2 data-testid="player-name">{player.username}</h2>
        <span data-testid="player-ranking">Elo: {player.eloScore}</span>
      </div>
      <button>undo last move</button>
    </PlayerName>
  );
};
