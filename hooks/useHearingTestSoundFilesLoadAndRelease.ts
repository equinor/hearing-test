import { useDemoMode } from "@equinor/mad-core";
import { useEffect, useRef, useState } from "react";
import Sound from "react-native-sound";
import { useSelector } from "react-redux";

import { selectTest } from "../store/test/reducer";
import { createSoundFile } from "../utils/sound/createSoundFile";
import { getSoundsKey } from "../utils/sound/getSoundsKey";

export const useHearingTestSoundFilesLoadAndRelease = () => {
  const [isSoundFilesLoaded, setIsSoundFilesLoaded] = useState(false);
  const test = useSelector(selectTest);
  const { isEnabled: isDemoModeEnabled } = useDemoMode();
  const soundsRef = useRef<Record<string, Sound>>({});
  const silentSoundRef = useRef(
    createSoundFile(require("../assets/audio/1000Hz_dobbel.wav"))
  );
  const demoModeSoundRef = useRef(
    createSoundFile(require("../assets/audio/1000Hz_dobbel.wav"))
  );

  useEffect(() => {
    if (!isSoundFilesLoaded && test.sounds) {
      loadSoundFiles();
    }
  }, [isSoundFilesLoaded, test]);

  const loadSoundFiles = () => {
    if (!isDemoModeEnabled) {
      test.sounds.forEach(
        ({ hz, uri }) =>
          (soundsRef.current[getSoundsKey(hz)] = createSoundFile(uri))
      );
    }
    setIsSoundFilesLoaded(true);
  };

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

  return {
    demoModeSoundRef,
    isSoundFilesLoaded,
    soundsRef,
  };
};
