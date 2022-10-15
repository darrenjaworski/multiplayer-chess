import { Theme } from "./@types/Theme";
import { grape } from "./boards/grape";
import { midnight } from "./boards/midnight";

// https://www.colourlovers.com/palette/4885822/%E0%B8%81%E2%8A%BE%E1%8E%A0uL%E2%82%A5uIzz
export const darkTheme: Theme = {
  colors: {
    primary: "#633D39",
    secondary: "#DBBBBF",
    text: "#B2CEB9",
    disabled: "#769491",
  },
  background: "#1F202A",
  boards: {
    midnight,
    grape,
  },
};
