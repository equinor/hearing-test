import Sound from "react-native-sound";

import { getSoundsKey } from "./getSoundsKey";
import { ApiSound } from "../../types";

const localSoundPath = "../../assets/audio/1000Hz_dobbel.wav";

export class Sounds {
  private silentSound: Sound;
  private demoModeSound: Sound;
  private apiSounds: Record<string, Sound>;
  private onSoundsLoaded: () => void;
  private isDemoModeEnabled: boolean;
  private apiSoundsFromTest: ApiSound[];

  constructor(
    apiSounds: ApiSound[],
    isDemoModeEnabled: boolean,
    onSoundsLoaded: () => void
  ) {
    this.silentSound = new Sound(require(localSoundPath), this.onSoundLoaded);
    this.demoModeSound = new Sound(require(localSoundPath), this.onSoundLoaded);
    this.apiSounds = {};
    this.onSoundsLoaded = onSoundsLoaded;
    this.isDemoModeEnabled = isDemoModeEnabled;
    this.apiSoundsFromTest = apiSounds;
    if (isDemoModeEnabled) return;
    this.loadApiSounds();
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

    const apiSounds = this.apiSoundsFromTest.map(
      ({ hz }) => this.apiSounds[getSoundsKey(hz)]
    );

    return baseSounds.concat(apiSounds);
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

    return this.apiSounds[getSoundsKey(hz)];
  };

  private loadApiSounds = () => {
    this.apiSoundsFromTest.forEach(({ hz, uri }) => {
      this.apiSounds[getSoundsKey(hz)] = new Sound(uri, "", this.onSoundLoaded);
    });
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
