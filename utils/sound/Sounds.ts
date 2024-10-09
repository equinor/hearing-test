import Sound from "react-native-sound";

import { getSoundsKey } from "./getSoundsKey";
import { HEARING_TEST_FREQUENCIES } from "../../constants/sounds";

const localSoundPath = "../../assets/audio/1000Hz_dobbel.wav";

export class Sounds {
  private silentSound: Sound;
  private demoModeSound: Sound;
  private testSounds: Record<string, Sound>;
  private onSoundsLoaded: () => void;
  private isDemoModeEnabled: boolean;

  constructor(isDemoModeEnabled: boolean, onSoundsLoaded: () => void) {
    this.silentSound = new Sound(require(localSoundPath), this.onSoundLoaded);
    this.demoModeSound = new Sound(require(localSoundPath), this.onSoundLoaded);
    this.testSounds = {};
    this.onSoundsLoaded = onSoundsLoaded;
    this.isDemoModeEnabled = isDemoModeEnabled;
    if (isDemoModeEnabled) return;
    this.loadTestSounds();
  }

  private onSoundLoaded = (error: unknown) => {
    if (error) {
      console.error("failed to load the sound", error);
      return;
    }
    const isSoundsLoaded = this.getIsSoundsLoaded(this.getSounds());
    if (isSoundsLoaded) {
      this.initializeSoundPlayback();
      this.playSilentSound();
      this.onSoundsLoaded();
    }
  };

  private getSounds = () => {
    const baseSounds = [this.silentSound, this.demoModeSound];
    if (this.isDemoModeEnabled) return baseSounds;

    const testSounds = HEARING_TEST_FREQUENCIES.map(
      (hz) => this.testSounds[getSoundsKey(hz)],
    );

    return baseSounds.concat(testSounds);
  };

  private getIsSoundsLoaded = (sounds: Sound[]) => {
    if (this.isDemoModeEnabled && sounds.length !== 2) return false;
    if (!this.isDemoModeEnabled && sounds.length < 3) return false;

    let isSoundsLoaded = true;
    sounds.forEach((sound) => {
      if (!sound.isLoaded()) {
        isSoundsLoaded = false;
      }
    });
    return isSoundsLoaded;
  };

  private playSilentSound = () => {
    this.silentSound.setVolume(0);
    this.silentSound.setNumberOfLoops(-1);
    this.silentSound.play();
  };

  public getSoundDurationMs = (hz: number): number => {
    return this.getSound(hz).getDuration() * 1000;
  };

  public getSound = (hz: number) => {
    if (this.isDemoModeEnabled) return this.demoModeSound;

    return this.testSounds[getSoundsKey(hz)];
  };

  private loadTestSounds = () => {
    this.testSounds = {
      [getSoundsKey(500)]: new Sound(
        require("../../assets/audio/500Hz_Dobbelpip.wav"),
        this.onSoundLoaded,
      ),
      [getSoundsKey(1000)]: new Sound(
        require("../../assets/audio/1kHz_Dobbelpip.wav"),
        this.onSoundLoaded,
      ),
      [getSoundsKey(2000)]: new Sound(
        require("../../assets/audio/2kHz_Dobbelpip.wav"),
        this.onSoundLoaded,
      ),
      [getSoundsKey(3000)]: new Sound(
        require("../../assets/audio/3kHz_Dobbelpip.wav"),
        this.onSoundLoaded,
      ),
      [getSoundsKey(4000)]: new Sound(
        require("../../assets/audio/4kHz_Dobbelpip.wav"),
        this.onSoundLoaded,
      ),
      [getSoundsKey(6000)]: new Sound(
        require("../../assets/audio/6kHz_Dobbelpip.wav"),
        this.onSoundLoaded,
      ),
      [getSoundsKey(8000)]: new Sound(
        require("../../assets/audio/8kHz_Dobbelpip.wav"),
        this.onSoundLoaded,
      ),
    };
  };

  private initializeSoundPlayback = () => {
    Sound.setCategory("Playback");
    Sound.setMode("Measurement");
    Sound.setActive(true);
  };

  public releaseSounds = () => {
    this.getSounds().forEach((sound) => {
      sound.stop();
      sound.release();
    });

    Sound.setActive(false);
  };
}
