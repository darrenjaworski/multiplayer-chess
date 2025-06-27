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
});
