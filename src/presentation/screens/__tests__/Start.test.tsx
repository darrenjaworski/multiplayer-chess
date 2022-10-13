import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameModes } from "../../../state-management/slices/game";
import { renderComponentWithRouter } from "../../../test-config/renderComponentWithStore";

// TODO come write some tests you tired bastard
describe("Start", () => {
  it("accepts user names and game selection", () => {
    renderComponentWithRouter();

    const whiteName = screen.getByTestId(
      "white-pieces-player-name"
    ) as HTMLInputElement;
    const blackName = screen.getByTestId(
      "black-pieces-player-name"
    ) as HTMLInputElement;

    fireEvent.change(blackName, { target: { value: "darren" } });
    expect(blackName.value).toEqual("darren");

    fireEvent.change(whiteName, { target: { value: "ian" } });
    expect(whiteName.value).toEqual("ian");

    const modeSelection = screen.getByTestId(
      `${GameModes.untimed}-mode-selection`
    );
    userEvent.click(modeSelection);
    expect(modeSelection).toHaveAttribute('checked');
  });
});
