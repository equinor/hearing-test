import { trackCustom } from "@equinor/mad-core";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import SystemSetting from "react-native-system-setting";

import { SYSTEM_VOLUME } from "../constants/sounds";
import { setSystemVolume } from "../utils/volume/setSystemVolume";

type VolumeContextType = {
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
  initialSystemVolume: number;
};

const VolumeContext = createContext<VolumeContextType>({
  isMuted: false,
  setIsMuted: () => {},
  initialSystemVolume: SYSTEM_VOLUME,
});

const useInitialSystemVolume = () => {
  const [initialSystemVolume, setInitialSystemVolume] = useState(SYSTEM_VOLUME);

  useEffect(() => {
    const setInitialDeviceSystemVolume = async () => {
      await SystemSetting.getVolume()
        .then((volume) => setInitialSystemVolume(volume))
        .catch((error) => {
          trackCustom("useInitialSystemVolume: Error getting system volume", {
            error,
          });
        });
    };
    setInitialDeviceSystemVolume();

    return () => setSystemVolume(initialSystemVolume);
  }, []);

  return { initialSystemVolume };
};

type VolumeProviderProps = {
  children: ReactNode;
};

export const VolumeProvider = ({ children }: VolumeProviderProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const { initialSystemVolume } = useInitialSystemVolume();

  return (
    <VolumeContext.Provider
      value={{
        isMuted,
        setIsMuted,
        initialSystemVolume,
      }}
    >
      {children}
    </VolumeContext.Provider>
  );
};

export const useVolumeContext = () => useContext(VolumeContext);
