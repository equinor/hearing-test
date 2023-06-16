import Sound from "react-native-sound";

export const createSoundFile = (filenameOrFile: any) => {
  const soundFile = new Sound(filenameOrFile, undefined, (error) => {
    if (error) {
      console.error("failed to load the sound", error);
    }
  });

  return soundFile;
};

export const systemVolume: number = 0.5;
