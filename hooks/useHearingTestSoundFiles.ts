import { useDemoMode } from "@equinor/mad-core";
import { useEffect, useRef, useState } from "react";
import Sound from "react-native-sound";
import { useSelector } from "react-redux";

import { useVolume } from "./useVolume";
import { useVolumeContext } from "../contexts/VolumeContext";
import { selectTest } from "../store/test/reducer";
import { NodeData } from "../types";
import { createSoundFile } from "../utils/sound/createSoundFile";

export const useHearingTestSoundFiles = () => {
  const silentSoundRef = useRef(
    createSoundFile(require("../assets/audio/1000Hz_dobbel.wav"))
  );
  const demoModeSoundRef = useRef(
    createSoundFile(require("../assets/audio/1000Hz_dobbel.wav"))
  );
  const soundsRef = useRef<Record<string, Sound>>({});
  const [isSoundFilesLoaded, setIsSoundFilesLoaded] = useState(false);

  const { isEnabled: isDemoModeEnabled } = useDemoMode();
  const test = useSelector(selectTest);

  const { initialSystemVolume } = useVolumeContext();
  const { getSoundVolume, setSystemVolume } = useVolume();

  useEffect(() => {
    if (!isSoundFilesLoaded && test.sounds) {
      loadSoundFiles();
    }
  }, [isSoundFilesLoaded, test]);

  useEffect(() => {
    initializeSoundPlayback();
    playSilentAudioClip();

    return () => releaseSoundFiles();
  }, []);

  const initializeSoundPlayback = () => {
    Sound.setCategory("Playback");
    Sound.setMode("Measurement");
    Sound.setActive(true);
  };

  const playSilentAudioClip = () => {
    silentSoundRef.current.setVolume(0);
    silentSoundRef.current.setNumberOfLoops(-1);
    silentSoundRef.current.play();
  };

  const releaseSoundFiles = () => {
    silentSoundRef.current.stop();
    silentSoundRef.current.release();

    demoModeSoundRef.current.stop();
    demoModeSoundRef.current.release();

    Object.keys(soundsRef.current).forEach((key) => {
      soundsRef.current[key].stop();
      soundsRef.current[key].release();
    });

    Sound.setActive(false);
  };

  const getSoundsKey = (hz: number) => `sound${hz}hz`;

  const loadSoundFiles = () => {
    if (!isDemoModeEnabled) {
      test.sounds.forEach(
        ({ hz, uri }) =>
          (soundsRef.current[getSoundsKey(hz)] = createSoundFile(uri))
      );
    }
    setIsSoundFilesLoaded(true);
  };

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
    soundFile.play(() => setSystemVolume(initialSystemVolume));
  };

  return {
    isSoundFilesLoaded,
    getSoundDuration,
    playSound,
  };
};
