import {
  Chessboard as ReactChessboard,
  ChessBoardProps,
} from "react-chessboard";

interface ChessboardProps extends ChessBoardProps {}

export const Chessboard = (props: ChessboardProps) => {
  const { id } = props;
  return <ReactChessboard id={id || Date.now()} />;
};
