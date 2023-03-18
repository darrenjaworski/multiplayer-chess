import { ThemeProvider } from "@emotion/react";
import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { MockStoreEnhanced } from "redux-mock-store";
import { ButtonProps, defaultButtonProps } from "../presentation/atoms/Button";
import { router } from "../presentation/routing/Routing";
import { AvailableThemes } from "../presentation/theme/@types/Theme";
import { theme } from "../presentation/theme/theme";
import type { RootState } from "../state-management/store";
import { createDefaultStore } from "./fakeStores";

export const renderComponentWithStore = (
  ComponentToRender: JSX.Element | React.ReactElement,
  definedStore: MockStoreEnhanced<RootState> | null = null
): RenderResult => {
  const store = definedStore ? definedStore : createDefaultStore();

  // TODO match the app usage more closely but for one component in isolation
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme.dark}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={ComponentToRender} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export const renderProviderWithStore = (
  ComponentToRender: JSX.Element | React.ReactElement,
  definedStore: MockStoreEnhanced<RootState> | null = null
): RenderResult => {
  const store = definedStore ? definedStore : createDefaultStore();

  return render(
    <Provider store={store}>{React.cloneElement(ComponentToRender)}</Provider>
  );
};

export const renderComponentWithRouter = (
  definedStore: MockStoreEnhanced<RootState> | null = null
): RenderResult => {
  const store = definedStore ? definedStore : createDefaultStore();
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme.dark}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export const renderAtomWithPropsAndTheme = (
  componentToRender: JSX.Element | React.ReactElement,
  props: ButtonProps = defaultButtonProps,
  selectedTheme: AvailableThemes = "dark"
) => {
  return render(
    <ThemeProvider theme={theme[selectedTheme]}>
      {React.cloneElement(componentToRender, props)}
    </ThemeProvider>
  );
};
