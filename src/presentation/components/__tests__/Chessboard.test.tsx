import { configure, render, screen } from "@testing-library/react";
import { Chessboard } from "../Chessboard";

describe("chessboard", () => {
  it("renders chessboard on screen", () => {
    configure({ testIdAttribute: "data-boardid" });

    const staticId = 12345;
    render(<Chessboard id={staticId} />);
    const chessboard = screen.getByTestId(staticId);

    expect(chessboard).toBeInTheDocument();
  });
});
