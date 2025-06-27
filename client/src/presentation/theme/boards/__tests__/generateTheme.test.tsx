import { render, screen } from "@testing-library/react";
import { CustomPieceFn } from "react-chessboard";
import { describe, expect, it } from "vitest";
import { BoardOptions } from "../../@types/BoardTheme";
import { generateTheme } from "../generateTheme";

describe("generate theme", () => {
  it("should generate a valid theme object", () => {
    const options: BoardOptions = {
      darkPieces: "#343a40",
      lightPieces: "#adb5bd",
      darkSquareBackground: "#6c757d",
      lightSquareBackground: "#f8f9fa",
      iconType: "Fa",
    };

    const actualTheme = generateTheme(options);

    const expectedThemeColors = {
      colors: {
        darkPieces: "#343a40",
        darkSquare: "#6c757d",
        lightPieces: "#adb5bd",
        lightSquare: "#f8f9fa",
      },
      customDarkSquareStyle: {
        backgroundColor: "#6c757d",
      },
      customLightSquareStyle: {
        backgroundColor: "#f8f9fa",
      },
    };

    const actualThemeColors = {
      colors: { ...actualTheme.colors },
      customDarkSquareStyle: { ...actualTheme.customDarkSquareStyle },
      customLightSquareStyle: { ...actualTheme.customLightSquareStyle },
    };

    expect(actualThemeColors).toEqual(expectedThemeColors);

    const WhiteKing = actualTheme.customPieces.wK as CustomPieceFn;

    render(
      <WhiteKing
        isDragging={false}
        squareWidth={0}
        droppedPiece={"wP"}
        targetSquare={"h1"}
        sourceSquare={"h1"}
      />
    );

    expect(screen.getByTestId("light-king")).toBeInTheDocument();
  });

  it("should handle all icon types", () => {
    const options: BoardOptions = {
      darkPieces: "#343a40",
      lightPieces: "#adb5bd",
      darkSquareBackground: "#6c757d",
      lightSquareBackground: "#f8f9fa",
      iconType: "Gi",
    };

    const actualTheme = generateTheme(options);

    const expectedThemeColors = {
      colors: {
        darkPieces: "#343a40",
        darkSquare: "#6c757d",
        lightPieces: "#adb5bd",
        lightSquare: "#f8f9fa",
      },
      customDarkSquareStyle: {
        backgroundColor: "#6c757d",
      },
      customLightSquareStyle: {
        backgroundColor: "#f8f9fa",
      },
    };

    const actualThemeColors = {
      colors: { ...actualTheme.colors },
      customDarkSquareStyle: { ...actualTheme.customDarkSquareStyle },
      customLightSquareStyle: { ...actualTheme.customLightSquareStyle },
    };

    expect(actualThemeColors).toEqual(expectedThemeColors);

    const WhiteKing = actualTheme.customPieces.wK as CustomPieceFn;

    render(
      <WhiteKing
        isDragging={false}
        squareWidth={0}
        droppedPiece={"wP"}
        targetSquare={"h1"}
        sourceSquare={"h1"}
      />
    );

    expect(screen.getByTestId("light-king")).toBeInTheDocument();
  });
});
