import WS from "jest-websocket-mock";
import { renderProviderWithStore } from "../../test-config/renderComponentWith";
import { WebSocketsProvider } from "../WebSocketsProvider";

let websocketServer: WS;
jest.mock("uuid", () => ({ v4: () => "123456789" }));

const setup = () =>
  renderProviderWithStore(
    <WebSocketsProvider>
      <h1>chess game</h1>
    </WebSocketsProvider>
  );

describe("WebSocketsProvider", () => {
  const base_url = `ws://localhost:8080`;
  process.env.REACT_APP_WEBSOCKETS_URL = base_url;

  beforeEach(async () => {
    websocketServer = new WS(`${base_url}/123456789`);
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
