import { render, RenderOptions } from "@testing-library/react";
import { FC, ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "store";

interface Props {
  children: ReactNode;
}

const ReduxProvider: FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ReduxProvider, ...options });
