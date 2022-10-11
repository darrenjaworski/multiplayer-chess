import { css, Global } from "@emotion/react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./presentation/components/ErrorBoundary";
import { router } from "./presentation/routing/Routing";
import { store } from "./state-management/store";

const globalCss = css`
  body {
    margin: 0 auto;
    max-width: 560px;
  }
  html {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Global styles={globalCss} />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
