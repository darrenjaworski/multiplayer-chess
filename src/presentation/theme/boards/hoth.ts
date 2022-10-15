import { BoardOptions } from "../@types/BoardTheme";
import { generateTheme } from "./generateTheme";

const hotOptions: BoardOptions = {
  darkPieces: "#343a40",
  lightPieces: "#adb5bd",
  darkSquareBackground: "#6c757d",
  lightSquareBackground: "#f8f9fa",
  iconType: "Fa",
};

export const hoth = generateTheme(hotOptions);
