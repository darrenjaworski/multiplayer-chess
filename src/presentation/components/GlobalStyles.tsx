import { css, Global, useTheme } from "@emotion/react";
import { Theme } from "../theme/@types/Theme";

export const GlobalStyles = () => {
  const theme = useTheme() as Theme;

  const globalCss = css`
    body {
      margin: 0 auto;
      max-width: 560px;
    }
    html {
      font-family: Arial, Helvetica, sans-serif;
      background: ${theme.background};
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    span,
    label,
    legend {
      color: ${theme.colors.text};
    }
    a {
      color: ${theme.colors.secondary};
    }
  `;

  return <Global styles={globalCss} />;
};
