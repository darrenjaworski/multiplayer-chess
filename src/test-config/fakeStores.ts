import { Chess, DEFAULT_POSITION, Move, Piece } from "chess.js";
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
    playerClockHistory: null,
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
      playerClockHistory: null,
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

export function createStoreWithPawnToPromote() {
  return mockStore({
    game: {
      playerClockHistory: null,
      fen: "rnbqkbn1/pppppppP/2r5/8/7P/8/PPPPPP2/RNBQKBNR w KQq - 1 6",
      turn: "w",
      captured: [
        {
          color: "b",
          type: "p",
        },
      ],
      history: [
        {
          color: "w",
          piece: "p",
          from: "h2",
          to: "h4",
          san: "h4",
          flags: "b",
        },
        {
          color: "b",
          piece: "p",
          from: "h7",
          to: "h5",
          san: "h5",
          flags: "b",
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
          piece: "r",
          from: "h8",
          to: "h6",
          san: "Rh6",
          flags: "n",
        },
        {
          color: "w",
          piece: "p",
          from: "g4",
          to: "h5",
          san: "gxh5",
          flags: "c",
          captured: "p",
        },
        {
          color: "b",
          piece: "r",
          from: "h6",
          to: "a6",
          san: "Ra6",
          flags: "n",
        },
        {
          color: "w",
          piece: "p",
          from: "h5",
          to: "h6",
          san: "h6",
          flags: "n",
        },
        {
          color: "b",
          piece: "r",
          from: "a6",
          to: "b6",
          san: "Rb6",
          flags: "n",
        },
        {
          color: "w",
          piece: "p",
          from: "h6",
          to: "h7",
          san: "h7",
          flags: "n",
        },
        {
          color: "b",
          piece: "r",
          from: "b6",
          to: "c6",
          san: "Rc6",
          flags: "n",
        },
      ],
    },
  });
}

export function createStoreWithGameState(gameState: Chess) {
  const gameHistory = gameState.history() as Move[];
  const captured = gameHistory.reduce(
    (capturedList: Piece[], move: Move): Piece[] => {
      if (move?.captured) {
        const capturedPiece: Piece = {
          type: move.captured,
          color: move.color === "w" ? "w" : "b",
        };
        capturedList.push(capturedPiece);
      }
      return capturedList;
    },
    []
  );

  return mockStore({
    game: {
      playerClockHistory: null,
      turn: gameState.turn(),
      fen: gameState.fen(),
      history: gameState.history() as Move[],
      captured,
    },
  });
}
