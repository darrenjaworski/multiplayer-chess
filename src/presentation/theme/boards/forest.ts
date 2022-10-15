import { BoardOptions } from "../@types/BoardTheme";
import { generateTheme } from "./generateTheme";

const forestOptions: BoardOptions = {
  darkPieces: "#283618",
  lightPieces: "#dda15e",
  darkSquareBackground: "#606c38",
  lightSquareBackground: "#fefae0",
  iconType: "Fa",
};

export const forest = generateTheme(forestOptions);
