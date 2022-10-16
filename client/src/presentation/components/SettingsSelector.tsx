import styled from "@emotion/styled";
import { FaChessBoard, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { MdNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  getShouldPlaySounds,
  playSounds,
} from "../../state-management/slices/settings";
import {
  getDarkBoardKey,
  getLightBoardKey,
  getThemeMode,
  updateBoardTheme,
  updateTheme,
} from "../../state-management/slices/theme";
import { Button } from "../atoms/Button";
import { darkBoardKeys, lightBoardKeys } from "../theme/theme";

const IconSelectorButton = styled(Button)`
  border-radius: 50%;
  padding: 4px 6px;
  > * {
    top: 0.1rem;
    position: relative;
  }
`;

const FixedActionButtons = styled.div`
  position: fixed;
  z-index: 0;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
`;

export const OptionsSelector = () => {
  const currentMode = useAppSelector(getThemeMode);
  const currentDarkBoard = useAppSelector(getDarkBoardKey);
  const currentLightBoard = useAppSelector(getLightBoardKey);
  const shouldPlaySounds = useAppSelector(getShouldPlaySounds);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    return currentMode === "dark"
      ? dispatch(updateTheme("light"))
      : dispatch(updateTheme("dark"));
  };

  const nextDarkBoardTheme = findNext(darkBoardKeys, currentDarkBoard);
  const nextLightBoardTheme = findNext(lightBoardKeys, currentLightBoard);

  const toggleBoardTheme = () => {
    return currentMode === "dark"
      ? dispatch(updateBoardTheme(nextDarkBoardTheme))
      : dispatch(updateBoardTheme(nextLightBoardTheme));
  };

  const toggleSoundEffects = () => {
    dispatch(playSounds(shouldPlaySounds ? false : true));
  };

  return (
    <FixedActionButtons>
      <IconSelectorButton>
        {shouldPlaySounds ? (
          <FaVolumeUp
            onClick={toggleSoundEffects}
            title={`turn sound effects ${shouldPlaySounds ? "off" : "on"}`}
          />
        ) : (
          <FaVolumeMute
            onClick={toggleSoundEffects}
            title={`turn sound effects ${shouldPlaySounds ? "off" : "on"}`}
          />
        )}
      </IconSelectorButton>
      <IconSelectorButton>
        <FaChessBoard
          onClick={toggleBoardTheme}
          title={`switch to ${
            currentMode === "dark" ? nextDarkBoardTheme : nextLightBoardTheme
          } board theme`}
        />
      </IconSelectorButton>
      <IconSelectorButton
        onClick={toggleTheme}
        title={`switch to ${currentMode === "dark" ? "light" : "dark"} mode`}
        data-testid="theme-selector"
      >
        {currentMode === "dark" ? <WiDaySunny /> : <MdNightlight />}
      </IconSelectorButton>
    </FixedActionButtons>
  );
};

function findNext(array: any, item: any) {
  const currentIndex = array.findIndex((d: any) => d === item);
  if (currentIndex + 1 > array.length - 1) return array[0];
  return array[currentIndex + 1];
}
