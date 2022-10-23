import { createBrowserRouter } from "react-router-dom";
import {
  GameModes,
  Player,
  PlayerType,
  updateId,
  updateMode,
  updatePlayers,
} from "../../state-management/slices/game";
import { store } from "../../state-management/store";
import { Game } from "../pages/Game";
import { NotFound } from "../pages/NotFound";
import { Start } from "../pages/Start";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Start />,
      errorElement: <NotFound />,
    },
    {
      path: "/game",
      element: <Game />,
      errorElement: <NotFound />,
      action: handleStartAction,
      children: [
        {
          path: ":id",
          element: <Game />,
          errorElement: <NotFound />,
          action: handleStartAction,
        },
      ],
    },
  ],
  {
    basename:
      process.env.REACT_APP_ENVIRONMENT === "GH" ? "/multiplayer-chess" : "/",
  }
);

// @ts-ignore
async function handleStartAction({ request }) {
  // TODO this feels really janky. there has to be an easier way to do this!
  const formData = await request.formData();
  const playerOne = formData.get("playerOne");
  const playertwo = formData.get("playerTwo");
  const gameId = formData.get("gameId");
  const mode = Number(formData.get("mode")) as GameModes;

  const players = [
    {
      username: playerOne,
      eloScore: 1,
      color: "w",
      type: PlayerType.humanLocal,
    },
    {
      username: playertwo,
      eloScore: 2,
      color: "b",
      type: PlayerType.humanLocal,
    },
  ] as Player[];

  store.dispatch(updatePlayers(players));
  store.dispatch(updateMode(mode));
  store.dispatch(updateId(gameId));
}
