import { BoardOptions } from "../@types/BoardTheme";
import { generateTheme } from "./generateTheme";

const tomatoOptions: BoardOptions = {
  darkPieces: "#461220",
  lightPieces: "#b23a48",
  darkSquareBackground: "#e8a598",
  lightSquareBackground: "#fed0bb",
  iconType: "Fa",
};

export const tomato = generateTheme(tomatoOptions);
