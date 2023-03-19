import WS from "jest-websocket-mock";
import { renderProviderWithStore } from "../../test-config/renderComponentWith";
import { SocketIOProvider } from "../SocketIOProvider";

let websocketServer: WS;

const setup = () =>
  renderProviderWithStore(
    <SocketIOProvider>
      <h1>chess game</h1>
    </SocketIOProvider>
  );

describe("WebSocketsProvider", () => {
  const base_url = `ws://localhost:8080`;
  process.env.REACT_APP_WEBSOCKETS_URL = base_url;

  beforeEach(async () => {
    websocketServer = new WS(`${base_url}`);
  });

  afterEach(() => {
    WS.clean();
  });

  it("connects to ws server", async () => {
    console.log = jest.fn();
    setup();

    await websocketServer.connected;
    expect(console.log).toHaveBeenCalledWith("on open");
  });
});
