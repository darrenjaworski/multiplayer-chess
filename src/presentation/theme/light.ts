import { Theme } from "./@types/Theme";
import { nautical } from "./boards/nautical";
import { tomato } from "./boards/tomato";

// https://www.colourlovers.com/palette/4885813/%C7%9E%D0%B2Dvl%C9%B1vi11
export const lightTheme: Theme = {
  colors: {
    primary: "#CABFC3",
    secondary: "#DBBBBF",
    text: "#455565",
    disabled: "gray",
  },
  background: "#F6F7F9",
  boards: {
    tomato,
    nautical,
  },
};
