import { css, Global } from "@emotion/react";
import { Game } from "./presentation/screens/Game";

const globalCss = css`
  body {
    margin: 0 auto;
    max-width: 560px;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalCss} />
      <Game
        playerOne={{ username: "darren", eloScore: 1 }}
        playerTwo={{ username: "ian", eloScore: 2 }}
      />
    </>
  );
}

export default App;
