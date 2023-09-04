// @ts-ignore
import MockedSocket from "socket.io-mock";
import { renderProviderWithStore } from "../../test-config/renderComponentWith";
import { SocketIOProvider } from "../SocketIOProvider";

jest.mock("socket.io-client");
jest.mock("../socket", () => {
  return {
    socket: new MockedSocket(),
  };
});

const setup = () =>
  renderProviderWithStore(
    <SocketIOProvider>
      <h1>chess game</h1>
    </SocketIOProvider>
  );

describe("WebSocketsProvider", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("connects to socket.io", () => {
    setup();
  });
});
