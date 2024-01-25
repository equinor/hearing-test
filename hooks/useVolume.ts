import { useEffect } from "react";

import { SYSTEM_VOLUME } from "../constants/sounds";
import { useVolumeContext } from "../contexts/VolumeContext";
import { setSystemVolume as importedSetSystemVolume } from "../utils/volume/setSystemVolume";

export const useVolume = () => {
  const { isMuted, setIsMuted, initialSystemVolume } = useVolumeContext();

  useEffect(() => {
    setSystemVolume();

    return () => setIsMuted(false);
  }, [isMuted]);

  /**
   * Get the default system volume, taking into account whether the volume is muted.
   *
   * @returns The default system volume. If the volume is muted, returns 0.
   */
  const getSystemVolume = (): number => {
    return isMuted ? 0 : SYSTEM_VOLUME;
  };

  /**
   * Sets the default system volume when no arguments are passed,
   * taking into account whether the volume is muted.
   *
   * @param value System volume
   */
  const setSystemVolume = (value = getSystemVolume()): void => {
    importedSetSystemVolume(value);
  };

  /**
   * Get the effective sound volume, taking into account whether the volume is muted.
   *
   * @param value - The sound volume to use if the volume is not muted.
   * @returns The effective sound volume. If the volume is muted, returns 0.
   */
  const getSoundVolume = (value: number): number => {
    return isMuted ? 0 : value;
  };

  return {
    isMuted,
    setIsMuted,
    initialSystemVolume,
    setSystemVolume,
    getSoundVolume,
  };
};
