import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./presentation/components/ErrorBoundary";
import { GlobalStyles } from "./presentation/components/GlobalStyles";
import { ThemeSelector } from "./presentation/components/ThemeSelector";
import { router } from "./presentation/routing/Routing";
import { CustomThemeProvider } from "./presentation/theme/CustomThemeProvider";
import { store } from "./state-management/store";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <CustomThemeProvider>
          <RouterProvider router={router} />
          <GlobalStyles />
          <ThemeSelector />
        </CustomThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
