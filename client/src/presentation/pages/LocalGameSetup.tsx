import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LocalGameSetup() {
  const [whiteName, setWhiteName] = useState("");
  const [blackName, setBlackName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/game/local/play", {
      state: { whiteName, blackName },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="white-player">White player name</label>
      <input
        id="white-player"
        value={whiteName}
        onChange={(e) => setWhiteName(e.target.value)}
      />
      <label htmlFor="black-player">Black player name</label>
      <input
        id="black-player"
        value={blackName}
        onChange={(e) => setBlackName(e.target.value)}
      />
      <button type="submit">Start Game</button>
    </form>
  );
}
