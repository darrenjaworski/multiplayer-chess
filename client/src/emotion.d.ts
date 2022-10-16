import "@emotion/react";
import { Theme as UserTheme } from "./presentation/theme/@types/Theme";

declare module "@emotion/react" {
  export interface Theme extends UserTheme {}
}
