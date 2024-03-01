import { trackCustom, useDemoMode } from "@equinor/mad-core";

import { useHearingTestSoundFilesLoadAndRelease } from "./useHearingTestSoundFilesLoadAndRelease";
import { useVolume } from "./useVolume";
import { NodeData } from "../types";
import { getSoundsKey } from "../utils/sound/getSoundsKey";

export const useHearingTestSoundFiles = () => {
  const { isEnabled: isDemoModeEnabled } = useDemoMode();
  const { getSoundVolume, setSystemVolume } = useVolume();
  const { demoModeSoundRef, isSoundFilesLoaded, soundsRef } =
    useHearingTestSoundFilesLoadAndRelease();

  const getSoundFile = (hz: number) => {
    if (isDemoModeEnabled) return demoModeSoundRef.current;

    return soundsRef.current[getSoundsKey(hz)];
  };

  /**
   *
   * @param hz Frequency of sound file
   * @returns The time of audio (milliseconds)
   */
  const getSoundDuration = (hz: number): number => {
    return getSoundFile(hz).getDuration() * 1000;
  };

  const playSound = ({ panning, stimulusMultiplicative, sound }: NodeData) => {
    const soundFile = getSoundFile(sound.hz);
    setSystemVolume();
    soundFile.setVolume(getSoundVolume(stimulusMultiplicative));
    soundFile.setPan(panning);
    soundFile.play((success) => {
      if (!success) {
        trackCustom("playSound: Audio decoding error interrupted playback");
      }
    });
  };

  return {
    isSoundFilesLoaded,
    getSoundDuration,
    playSound,
  };
};
