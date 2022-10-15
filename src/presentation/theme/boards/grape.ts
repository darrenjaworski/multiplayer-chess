import { BoardOptions } from "../@types/BoardTheme";
import { generateTheme } from "./generateTheme";

const grapeOptions: BoardOptions = {
  darkPieces: "#231942",
  lightPieces: "#e0b1cb",
  darkSquareBackground: "#5e548e",
  lightSquareBackground: "#9f86c0",
  iconType: "Fa",
};

export const grape = generateTheme(grapeOptions);
