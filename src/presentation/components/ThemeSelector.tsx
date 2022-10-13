import styled from "@emotion/styled";
import { MdNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
import { Button } from "../atoms/Button";
import type { AvailableThemes } from "../theme/@types/Theme";

interface ThemeSelectorProps {
  toggleTheme: (themes: AvailableThemes) => void;
  currentTheme: AvailableThemes;
}

// @ts-ignore
const FixedThemeSelector = styled(Button)`
  position: fixed;
  z-index: 0;
  bottom: 0;
  right: 0;
`;

export const ThemeSelector = (props: ThemeSelectorProps) => {
  const { currentTheme, toggleTheme } = props;
  return (
    // @ts-ignore
    <FixedThemeSelector
      onClick={() => toggleTheme(currentTheme === "dark" ? "light" : "dark")}
      title="toggle light and dark mode"
    >
      {currentTheme === "dark" ? <WiDaySunny /> : <MdNightlight />}
    </FixedThemeSelector>
  );
};
