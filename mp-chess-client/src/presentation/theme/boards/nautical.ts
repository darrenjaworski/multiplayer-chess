import { BoardOptions } from "../@types/BoardTheme";
import { generateTheme } from "./generateTheme";

const nauticalOptions: BoardOptions = {
  darkPieces: "#0d1b2a",
  lightPieces: "#778da9",
  darkSquareBackground: "#415a77",
  lightSquareBackground: "#e0e1dd",
  iconType: "Fa",
};

export const nautical = generateTheme(nauticalOptions);
