import { Boards } from "./BoardTheme";

export interface Theme {
  colors: Colors;
  background: string;
  boards: Boards;
}

interface Colors {
  text: string;
  primary: string;
  secondary: string;
  disabled: string;
}

export interface Themes {
  light: Theme;
  dark: Theme;
}

export type AvailableThemes = keyof Themes;
