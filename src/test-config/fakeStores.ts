import { DEFAULT_POSITION, Piece } from "chess.js";
import createMockStore, {
  MockStoreCreator,
  MockStoreEnhanced,
} from "redux-mock-store";
import type { AppDispatch, RootState } from "../state-management/store";

export type FakeStore = MockStoreEnhanced<RootState, AppDispatch>;

const mockStore: MockStoreCreator<RootState, AppDispatch> = createMockStore([]);
export const initialRootState: RootState = {
  game: {
    fen: DEFAULT_POSITION,
    turn: "w",
    captured: [],
    history: [],
  },
};

export function createDefaultStore() {
  return mockStore({ ...initialRootState });
}

export function createStoreWithBlackTurn() {
  return mockStore({
    game: {
      ...initialRootState.game,
      turn: "b",
    },
  });
}

export function createStoreWithCapturedPieces(captured: Piece[]) {
  return mockStore({
    game: {
      ...initialRootState.game,
      captured,
    },
  });
}

export function createStoreWithHistory() {
  return mockStore({
    game: {
      fen: "rnbq1b1r/ppp1pkpp/3p4/8/8/5P2/PPPPP2R/RNBQKB2 b Q - 0 6",
      turn: "b",
      captured: [
        {
          color: "w",
          type: "p",
        },
        {
          color: "b",
          type: "p",
        },
        {
          color: "w",
          type: "n",
        },
        {
          color: "w",
          type: "p",
        },
        {
          color: "b",
          type: "n",
        },
      ],
      history: [
        {
          color: "w",
          piece: "n",
          from: "g1",
          to: "f3",
          san: "Nf3",
          flags: "n",
        },
        {
          color: "b",
          piece: "n",
          from: "g8",
          to: "f6",
          san: "Nf6",
          flags: "n",
        },
        {
          color: "w",
          piece: "p",
          from: "g2",
          to: "g4",
          san: "g4",
          flags: "b",
        },
        {
          color: "b",
          piece: "n",
          from: "f6",
          to: "g4",
          san: "Nxg4",
          flags: "c",
          captured: "p",
        },
        {
          color: "w",
          piece: "n",
          from: "f3",
          to: "e5",
          san: "Ne5",
          flags: "n",
        },
        {
          color: "b",
          piece: "p",
          from: "d7",
          to: "d6",
          san: "d6",
          flags: "n",
        },
        {
          color: "w",
          piece: "n",
          from: "e5",
          to: "f7",
          san: "Nxf7",
          flags: "c",
          captured: "p",
        },
        {
          color: "b",
          piece: "k",
          from: "e8",
          to: "f7",
          san: "Kxf7",
          flags: "c",
          captured: "n",
        },
        {
          color: "w",
          piece: "p",
          from: "f2",
          to: "f3",
          san: "f3",
          flags: "n",
        },
        {
          color: "b",
          piece: "n",
          from: "g4",
          to: "h2",
          san: "Nxh2",
          flags: "c",
          captured: "p",
        },
        {
          color: "w",
          piece: "r",
          from: "h1",
          to: "h2",
          san: "Rxh2",
          flags: "c",
          captured: "n",
        },
      ],
    },
  });
}
