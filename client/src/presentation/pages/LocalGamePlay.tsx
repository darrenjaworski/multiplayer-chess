import { useLocation } from "react-router-dom";

export function LocalGamePlay() {
  const location = useLocation();
  const { whiteName, blackName } = location.state || {};

  return (
    <div>
      <h1>Local Game</h1>
      <div>White: {whiteName}</div>
      <div>Black: {blackName}</div>
      {/* Chessboard and game logic would go here */}
    </div>
  );
}
