import { BoardOptions } from "../@types/BoardTheme";
import { generateTheme } from "./generateTheme";

const nauticalOptions: BoardOptions = {
  darkPieces: "#0d1b2a",
  lightPieces: "#e0e1dd",
  darkSquareBackground: "#415a77",
  lightSquareBackground: "#778da9",
  iconType: "Fa",
};

export const nautical = generateTheme(nauticalOptions);
