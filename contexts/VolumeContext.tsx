import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { SYSTEM_VOLUME } from "../constants/sounds";
import { useInitialSystemVolume } from "../hooks/useInitialSystemVolume";

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
