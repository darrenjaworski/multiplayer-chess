import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./presentation/components/ErrorBoundary";
import { GlobalStyles } from "./presentation/components/GlobalStyles";
import { OptionsSelector } from "./presentation/components/SettingsSelector";
import { router } from "./presentation/routing/Routing";
import { CustomThemeProvider } from "./providers/CustomThemeProvider";
import { WebSocketsProvider } from "./providers/WebSocketsProvider";
import { store } from "./state-management/store";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <WebSocketsProvider>
          <CustomThemeProvider>
            <RouterProvider router={router} />
            <GlobalStyles />
            <OptionsSelector />
          </CustomThemeProvider>
        </WebSocketsProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
