export interface Theme {
  colors: Colors;
  background: string;
}

interface Colors {
  text: string;
  primary: string;
  secondary: string;
  disabled: string;
}

export type AvailableThemes = keyof Theme;
