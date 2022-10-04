import { render, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";
import type { RootState } from "../state-management/store";
import { createDefaultStore } from "./fakeStores";

export const renderComponentWithStore = (
  ComponentToRender: JSX.Element | React.ReactElement,
  definedStore: MockStoreEnhanced<RootState> | null = null
): RenderResult => {
  const store = definedStore ? definedStore : createDefaultStore();
  return render(<Provider store={store}>{ComponentToRender}</Provider>);
};
