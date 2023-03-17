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
  beforeEach(async () => {
    websocketServer = new WS("ws://localhost:8080");

    await websocketServer.connected;
  });

  afterEach(() => {
    WS.clean();
  });

  it("connects to ws socert", async () => {
    setup();
  });
});
