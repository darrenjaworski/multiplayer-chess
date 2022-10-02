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
