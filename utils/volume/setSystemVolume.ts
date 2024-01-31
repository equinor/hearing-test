import SystemSetting from "react-native-system-setting";

export const setSystemVolume = (value: number): void => {
  SystemSetting.setVolume(value, { showUI: false });
};
