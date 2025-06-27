import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ErrorBoundary } from "../ErrorBoundary";

describe("ErrorBoundary", () => {
  it("triggers from error", () => {
    const ThrowError = () => {
      throw new Error("test");
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });
});
