import { ThemeProvider } from "@emotion/react";
import React, { ReactElement } from "react";
import { useAppSelector } from "../state-management/hooks";
import { getTheme } from "../state-management/slices/theme";

interface CustomThemeProviderProps {
  children: React.ReactElement | ReactElement[];
}

export const CustomThemeProvider = (props: CustomThemeProviderProps) => {
  const currentTheme = useAppSelector(getTheme);
  const { children } = props;
  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};
