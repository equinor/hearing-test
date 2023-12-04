import { Button, ButtonProps } from "@equinor/mad-components";

import { isProduction } from "../../../constants/settings";

type MuteButtonProps = Pick<ButtonProps, "onPress"> & {
  isVolumeMuted: boolean;
};

export const MuteButton = ({ isVolumeMuted, onPress }: MuteButtonProps) => (
  <Button.Icon
    name={isVolumeMuted ? "volume-mute" : "volume-high"}
    onPress={onPress}
    variant="ghost"
    disabled={isProduction}
    style={{ opacity: isProduction ? 0 : 1 }}
  />
);
