import { useDemoMode } from "@equinor/mad-core";
import { useEffect, useMemo, useState } from "react";

import { useVolume } from "./useVolume";
import { useVolumeContext } from "../contexts/VolumeContext";
import { NodeData } from "../types";
import { Sounds } from "../utils/sound/Sounds";

export const useHearingTestSounds = () => {
  const [isSoundsLoaded, setIsSoundsLoaded] = useState(false);
  const { initialSystemVolume } = useVolumeContext();
  const { getSoundVolume, setSystemVolume } = useVolume();
  const { isEnabled: isDemoModeEnabled } = useDemoMode();

  const sounds = useMemo(() => {
    return new Sounds(isDemoModeEnabled, () => {
      setIsSoundsLoaded(true);
    });
  }, [isDemoModeEnabled]);

  useEffect(() => {
    return () => sounds.releaseSounds();
  }, []);

  const playSound = ({
    panning,
    stimulusMultiplicative,
    sound: { hz },
  }: NodeData) => {
    const sound = sounds.getSound(hz);
    setSystemVolume();
    sound.setVolume(getSoundVolume(stimulusMultiplicative));
    sound.setPan(panning);
    sound.play(() => setSystemVolume(initialSystemVolume));
  };

  return {
    isSoundsLoaded,
    getSoundDurationMs: sounds.getSoundDurationMs,
    playSound,
  };
};
