import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Button } from "../atoms/Button";

export const JoinGame = () => {
  const [joinId, setJoinId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [preferredColor, setPreferredColor] = useState<
    "white" | "black" | "auto"
  >("auto");
  const navigate = useNavigate();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = uuid();
    navigate(`/game/${newId}`, {
      state: {
        playerName,
        preferredColor: preferredColor === "auto" ? undefined : preferredColor,
      },
    });
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinId) return;
    navigate(`/game/${joinId}`, {
      state: {
        playerName,
        preferredColor: undefined, // joining, so let server assign
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <h2>Join or Create a Game</h2>
      <form
        onSubmit={handleCreate}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <label htmlFor="player-name">Your Name</label>
        <input
          id="player-name"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
          placeholder="Enter your name"
        />
        <fieldset>
          <legend>Choose your color (for new game)</legend>
          <label>
            <input
              type="radio"
              name="color"
              value="white"
              checked={preferredColor === "white"}
              onChange={() => setPreferredColor("white")}
            />
            White
          </label>
          <label>
            <input
              type="radio"
              name="color"
              value="black"
              checked={preferredColor === "black"}
              onChange={() => setPreferredColor("black")}
            />
            Black
          </label>
          <label>
            <input
              type="radio"
              name="color"
              value="auto"
              checked={preferredColor === "auto"}
              onChange={() => setPreferredColor("auto")}
            />
            Auto-assign
          </label>
        </fieldset>
        <Button type="submit" variant="contained">
          Create Game
        </Button>
      </form>
      <form
        onSubmit={handleJoin}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <label htmlFor="join-id">Game ID to Join</label>
        <input
          id="join-id"
          type="text"
          value={joinId}
          onChange={(e) => setJoinId(e.target.value)}
          required
          placeholder="Enter game ID to join"
        />
        <Button type="submit" variant="contained">
          Join Game
        </Button>
      </form>
    </div>
  );
};
