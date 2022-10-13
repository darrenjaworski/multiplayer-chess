import { ThemeProvider } from "@emotion/react";
import { render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { MockStoreEnhanced } from "redux-mock-store";
import { router } from "../presentation/routing/Routing";
import { theme } from "../presentation/theme/theme";
import type { RootState } from "../state-management/store";
import { createDefaultStore } from "./fakeStores";

export const renderComponentWithStore = (
  ComponentToRender: JSX.Element | React.ReactElement,
  definedStore: MockStoreEnhanced<RootState> | null = null
): RenderResult => {
  const store = definedStore ? definedStore : createDefaultStore();
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme.dark}>{ComponentToRender}</ThemeProvider>
    </Provider>
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
