import { useEffect, useState } from "react";
import SystemSetting from "react-native-system-setting";

import { SYSTEM_VOLUME } from "../constants/sounds";

export const useInitialSystemVolume = () => {
  const [initialSystemVolume, setInitialSystemVolume] = useState(SYSTEM_VOLUME);

  useEffect(() => {
    SystemSetting.getVolume().then((volume) => setInitialSystemVolume(volume));
  }, []);

  return { initialSystemVolume };
};
