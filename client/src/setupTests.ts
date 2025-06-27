import "@testing-library/jest-dom";
import ReactModal from "react-modal";

// #root doesn't exist in tests...
import { vi } from "vitest";
vi.spyOn(ReactModal, "setAppElement").mockImplementation((_param) => {});
vi.mock("socket.io-client");
