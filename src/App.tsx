import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./presentation/components/ErrorBoundary";
import { GlobalStyles } from "./presentation/components/GlobalStyles";
import { ThemeSelector } from "./presentation/components/ThemeSelector";
import { router } from "./presentation/routing/Routing";
import { AvailableThemes } from "./presentation/theme/@types/Theme";
import { theme } from "./presentation/theme/theme";
import { store } from "./state-management/store";

const initialThemeState: AvailableThemes = "dark";

function App() {
  const [currentTheme, setCurrentTheme] = useState(initialThemeState);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme[currentTheme]}>
          <RouterProvider router={router} />
          <GlobalStyles />
          <ThemeSelector
            currentTheme={currentTheme}
            toggleTheme={setCurrentTheme}
          />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
