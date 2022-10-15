import { createBrowserRouter } from "react-router-dom";
import {
  GameModes,
  updateMode,
  updatePlayers,
} from "../../state-management/slices/game";
import { store } from "../../state-management/store";
import { Game, Player } from "../screens/Game";
import { NotFound } from "../screens/NotFound";
import { Start } from "../screens/Start";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
    errorElement: <NotFound />,
  },
  {
    path: "/game",
    element: <Game />,
    action: async ({ request }) => {
      // TODO this feels really janky. there has to be an easier way to do this!
      const formData = await request.formData();
      const playerOne = formData.get("playerOne");
      const playertwo = formData.get("playerTwo");
      const mode = Number(formData.get("mode")) as GameModes;

      const players = [
        { username: playerOne, eloScore: 1 },
        { username: playertwo, eloScore: 2 },
      ] as Player[];

      store.dispatch(updatePlayers(players));
      store.dispatch(updateMode(mode));
    },
    children: [{ path: ":id", element: <Game /> }],
  },
]);
