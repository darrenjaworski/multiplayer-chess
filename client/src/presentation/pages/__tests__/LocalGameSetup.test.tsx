import { ThemeProvider } from "@emotion/react";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as socketIoClient from "socket.io-client";
import { describe, expect, it } from "vitest";
import { appReducer } from "../../../state-management/appReducer";
import {
  GameTypes,
  updatePlayers,
} from "../../../state-management/slices/game";
import { store } from "../../../state-management/store";
import { theme } from "../../theme/theme";
import { Game } from "../Game";
import { LocalGameSetup } from "../LocalGameSetup";

function renderLocalGameSetup() {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme.dark}>
        <MemoryRouter initialEntries={["/game/local"]}>
          <Routes>
            <Route path="/game/local" element={<LocalGameSetup />} />
            <Route path="/game/local/play" element={<Game />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}

describe("LocalGameSetup", () => {
  it("shows two name inputs and a start button", () => {
    renderLocalGameSetup();
    expect(screen.getByLabelText(/white player name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/black player name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start game/i })
    ).toBeInTheDocument();
  });

  it("navigates to the local game with player names when started", async () => {
    renderLocalGameSetup();
    const whiteInput = screen.getByLabelText(/white player name/i);
    const blackInput = screen.getByLabelText(/black player name/i);
    const startButton = screen.getByRole("button", { name: /start game/i });

    await userEvent.type(whiteInput, "Alice");
    await userEvent.type(blackInput, "Bob");
    await userEvent.click(startButton);

    // Check for player names in the Game UI
    expect(await screen.findAllByTestId("player-name")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textContent: "Alice" }),
        expect.objectContaining({ textContent: "Bob" }),
      ])
    );
  });

  it("centers the form and uses the styled Button", () => {
    renderLocalGameSetup();
    const form = screen.getByTestId("local-game-setup-form");
    // Check for centering style or class
    const formStyle = window.getComputedStyle(form);
    expect(formStyle.display).toBe("flex");
    expect(formStyle.flexDirection).toBe("column");
    expect(formStyle.alignItems).toBe("center");

    // Check that the Start button uses the custom Button styles
    const startButton = screen.getByRole("button", { name: /start game/i });
    const buttonStyle = window.getComputedStyle(startButton);
    expect(buttonStyle.padding).toMatch(/0.75.*1/);
    expect(buttonStyle.border).toMatch(/solid/);
  });

  it("does not connect to websockets when starting a local game", async () => {
    const ioSpy = vi.spyOn(socketIoClient, "io");

    renderLocalGameSetup();
    const whiteInput = screen.getByLabelText(/white player name/i);
    const blackInput = screen.getByLabelText(/black player name/i);
    const startButton = screen.getByRole("button", { name: /start game/i });

    await userEvent.type(whiteInput, "Alice");
    await userEvent.type(blackInput, "Bob");
    await userEvent.click(startButton);

    // Assert that io was not called at all during local game setup/play
    expect(ioSpy).not.toHaveBeenCalled();
  });

  it("redirects to setup if player names are missing in LocalGamePlay", async () => {
    // Create a fresh store for this test to avoid state leakage
    const freshStore = configureStore({
      reducer: appReducer,
    });
    // Set players to empty names to simulate missing player names
    freshStore.dispatch(
      updatePlayers([
        { username: "", eloScore: 1, color: "w", type: 0 },
        { username: "", eloScore: 2, color: "b", type: 0 },
      ])
    );
    render(
      <Provider store={freshStore}>
        <ThemeProvider theme={theme.dark}>
          <MemoryRouter initialEntries={["/game/local/play"]}>
            <Routes>
              <Route path="/game/local" element={<LocalGameSetup />} />
              <Route path="/game/local/play" element={<Game />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    // Should see the setup form again
    expect(
      await screen.findByLabelText(/white player name/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/black player name/i)).toBeInTheDocument();
  });

  it("sets game type to local and players when starting local game", async () => {
    renderLocalGameSetup();
    const whiteInput = screen.getByLabelText(/white player name/i);
    const blackInput = screen.getByLabelText(/black player name/i);
    const startButton = screen.getByRole("button", { name: /start game/i });

    await userEvent.type(whiteInput, "Alice");
    await userEvent.type(blackInput, "Bob");
    await userEvent.click(startButton);

    // Check Redux state
    const state = store.getState();
    expect(state.game.type).toBe(GameTypes.humanVsHumanLocal);
    expect(state.game.players[0].username).toBe("Alice");
    expect(state.game.players[1].username).toBe("Bob");
  });
});
