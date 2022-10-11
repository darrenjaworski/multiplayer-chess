import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./presentation/components/ErrorBoundary";
import { GlobalStyles } from "./presentation/components/GlobalStyles";
import { router } from "./presentation/routing/Routing";
import { theme } from "./presentation/theme/theme";
import { store } from "./state-management/store";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme.dark}>
          <RouterProvider router={router} />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
