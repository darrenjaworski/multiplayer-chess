import { screen } from "@testing-library/react";
import { renderAtomWithPropsAndTheme } from "../../../test-config/renderComponentWithStore";
import { theme } from "../../theme/theme";
import { Button } from "../Button";

describe("Button", () => {
  it("can handle outlined styling", () => {
    // @ts-ignore
    renderAtomWithPropsAndTheme(<Button />, { "data-testid": "outlined" });

    const button = screen.getByTestId("outlined");

    const expectedStyles = {
      border: `1px solid ${theme.dark.colors.text}`,
      background: theme.dark.background,
      color: theme.dark.colors.text,
    };

    expect(button).toHaveStyle(expectedStyles);
  });

  it("can render contained styling", () => {
    // @ts-ignore
    renderAtomWithPropsAndTheme(<Button />, {
      "data-testid": "contained",
      variant: "contained",
    });

    const button = screen.getByTestId("contained");

    const expectedStyles = {
      border: `1px solid ${theme.dark.colors.text}`,
      background: theme.dark.colors.text,
      color: theme.dark.background,
    };

    expect(button).toHaveStyle(expectedStyles);
  });
});
