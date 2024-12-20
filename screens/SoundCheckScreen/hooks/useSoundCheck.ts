import { useEffect, useRef } from "react";
import Sound from "react-native-sound";
import SystemSetting from "react-native-system-setting";

import { ANIMATION_DURATION } from "../../../constants/animation";
import { SYSTEM_VOLUME } from "../../../constants/sounds";
import { useInitialSystemVolume } from "../../../hooks/useInitialSystemVolume";
import { Ear } from "../../../types";
import { getPan } from "../../../utils/getPan";

export const useSoundCheck = (
  ear: Ear | undefined,
  playSoundDeps: unknown[],
) => {
  const { initialSystemVolume } = useInitialSystemVolume();
  const sound = useRef(
    new Sound(require("../../../assets/audio/1000Hz_dobbel.wav")),
  ).current;

  useEffect(() => {
    Sound.setCategory("Playback");
    Sound.setMode("Measurement");
    Sound.setActive(true);
  }, []);

  useEffect(() => {
    if (!ear) return;
    sound.stop();
    setTimeout(() => playSound(ear), ANIMATION_DURATION + 1000);
  }, playSoundDeps);

  const playSound = (ear: Ear) => {
    SystemSetting.setVolume(SYSTEM_VOLUME);
    sound.setVolume(0.5);
    sound.setPan(getPan(ear));
    sound.play(() => SystemSetting.setVolume(initialSystemVolume));
  };

  return { sound, playSound };
};
