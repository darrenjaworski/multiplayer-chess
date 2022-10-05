import { configure, screen } from "@testing-library/react";
import { renderComponentWithStore } from "../../../test-config/renderComponentWithStore";
import { Chessboard } from "../Chessboard";

describe("Chessboard", () => {
  it("renders chessboard on screen", () => {
    configure({ testIdAttribute: "data-boardid" });

    const staticId = 12345;
    renderComponentWithStore(<Chessboard id={staticId} />);
    const chessboard = screen.getByTestId(staticId);

    expect(chessboard).toBeInTheDocument();
  });

  xit("handles promotions", () => {});
});
