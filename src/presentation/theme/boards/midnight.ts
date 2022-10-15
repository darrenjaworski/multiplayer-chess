import { BoardOptions } from "../@types/BoardTheme";
import { generateTheme } from "./generateTheme";

const midnightOptions: BoardOptions = {
  darkPieces: "#1f363d",
  lightPieces: "#cfe0c3",
  darkSquareBackground: "#40798c",
  lightSquareBackground: "#70a9a1",
  iconType: "Fa",
};

export const midnight = generateTheme(midnightOptions);
