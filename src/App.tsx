import { css, Global } from "@emotion/react";
import { Provider } from "react-redux";
import { Game } from "./presentation/screens/Game";
import { store } from "./state-management/store";

const globalCss = css`
  body {
    margin: 0 auto;
    max-width: 560px;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <Global styles={globalCss} />
      <Game
        playerOne={{ username: "darren", eloScore: 1 }}
        playerTwo={{ username: "ian", eloScore: 2 }}
      />
    </Provider>
  );
}

export default App;
