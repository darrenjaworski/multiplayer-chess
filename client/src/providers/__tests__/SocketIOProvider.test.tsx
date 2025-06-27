// @ts-ignore
import MockedSocket from "socket.io-mock";
import { afterEach, describe, it, vi } from "vitest";
import { renderProviderWithStore } from "../../test-config/renderComponentWith";
import { SocketIOProvider } from "../SocketIOProvider";

vi.mock("socket.io-client");
vi.mock("../socket", () => {
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

describe("SocketIOProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("connects to socket.io", () => {
    setup();
  });

  it("does not connect to socket.io for local games", () => {
    // Mock Redux selector to return local game type
    vi.mock("../../state-management/hooks", () => ({
      useAppSelector: () => 0, // GameTypes.humanVsHumanLocal
      useAppDispatch: () => vi.fn(),
    }));
    const socketOnSpy = vi.spyOn(MockedSocket.prototype, "on");
    renderProviderWithStore(
      <SocketIOProvider>
        <h1>chess game</h1>
      </SocketIOProvider>
    );
    expect(socketOnSpy).not.toHaveBeenCalled();
  });
});
