import { render } from "@testing-library/react";
import WS from "jest-websocket-mock";
import { WebSocketsProvider } from "../WebSocketsProvider";

let websocketServer: WS;

const setup = () =>
  render(
    <WebSocketsProvider>
      <h1>chess game</h1>
    </WebSocketsProvider>
  );

describe("WebSocketsProvider", () => {
  const mockedWSURL = "ws://localhost:8080";
  process.env.WEBSOCKETS_URL = mockedWSURL;

  beforeEach(async () => {
    websocketServer = new WS(mockedWSURL);

    await websocketServer.connected;
  });

  afterEach(() => {
    WS.clean();
  });

  it("connects to ws socert", async () => {
    setup();
  });
});
