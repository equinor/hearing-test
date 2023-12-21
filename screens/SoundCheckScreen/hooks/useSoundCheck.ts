import { useEffect, useRef } from "react";
import Sound from "react-native-sound";
import SystemSetting from "react-native-system-setting";

import { SYSTEM_VOLUME } from "../../../constants/sounds";
import { Ear } from "../../../types";
import { getPan } from "../../../utils/getPan";

export const useSoundCheck = (initialSystemVolume: number) => {
  const sound = useRef(
    new Sound(require("../../../assets/audio/1000Hz_dobbel.wav"))
  ).current;

  useEffect(() => {
    Sound.setCategory("Playback");
    Sound.setMode("Measurement");
    Sound.setActive(true);
  }, []);

  const playSound = (ear: Ear) => {
    SystemSetting.setVolume(SYSTEM_VOLUME);
    sound.setVolume(0.5);
    sound.setPan(getPan(ear));
    sound.play(() => SystemSetting.setVolume(initialSystemVolume));
  };

  return { sound, playSound };
};
