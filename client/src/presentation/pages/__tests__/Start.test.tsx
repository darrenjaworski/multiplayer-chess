import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderComponentWithRouter } from "../../../test-config/renderComponentWith";

describe("Start", () => {
  it("shows options for local, computer, and online play", () => {
    renderComponentWithRouter();
    expect(screen.getByText(/play locally/i)).toBeInTheDocument();
    expect(screen.getByText(/play against computer/i)).toBeInTheDocument();
    expect(screen.getByText(/create or join online game/i)).toBeInTheDocument();
  });

  it("navigates to local game when 'Play locally' is clicked", () => {
    renderComponentWithRouter();
    userEvent.click(screen.getByText(/play locally/i));
    // TODO: assert navigation or state change
  });

  it("navigates to computer game when 'Play against computer' is clicked", () => {
    renderComponentWithRouter();
    userEvent.click(screen.getByText(/play against computer/i));
    // TODO: assert navigation or state change
  });

  it("navigates to join/create online game when 'Create or join online game' is clicked", () => {
    renderComponentWithRouter();
    userEvent.click(screen.getByText(/create or join online game/i));
    // TODO: assert navigation or state change
  });
});
