import { Themes } from "./@types/Theme";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export const theme: Themes = {
  light: {
    ...lightTheme,
  },
  dark: {
    ...darkTheme,
  },
};
