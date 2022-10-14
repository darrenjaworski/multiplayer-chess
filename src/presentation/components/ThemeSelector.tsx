import styled from "@emotion/styled";
import { MdNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
import { Button } from "../atoms/Button";
import type { AvailableThemes } from "../theme/@types/Theme";

interface ThemeSelectorProps {
  toggleTheme: (themes: AvailableThemes) => void;
  currentTheme: AvailableThemes;
}

const FixedThemeSelector = styled(Button)`
  position: fixed;
  z-index: 0;
  bottom: 1rem;
  right: 1rem;
  border-radius: 50%;
  padding: 4px 6px;
  > * {
    top: 0.1rem;
    position: relative;
  }
`;

export const ThemeSelector = (props: ThemeSelectorProps) => {
  const { currentTheme, toggleTheme } = props;
  return (
    <FixedThemeSelector
      onClick={() => toggleTheme(currentTheme === "dark" ? "light" : "dark")}
      title={`switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
      data-testid="theme-selector"
    >
      {currentTheme === "dark" ? <WiDaySunny /> : <MdNightlight />}
    </FixedThemeSelector>
  );
};
