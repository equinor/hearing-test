import { Button } from "@equinor/mad-components";

import { isProduction } from "../../../constants/settings";
import { useVolumeContext } from "../../../contexts/VolumeContext";

type MuteButtonProps = { isVisible?: boolean };

export const MuteButton = ({ isVisible = true }: MuteButtonProps) => {
  const { isMuted, setIsMuted } = useVolumeContext();

  return (
    <Button.Icon
      name={isMuted ? "volume-mute" : "volume-high"}
      onPress={() => setIsMuted((prevIsMuted) => !prevIsMuted)}
      variant="ghost"
      disabled={isProduction || !isVisible}
      style={{ opacity: isProduction || !isVisible ? 0 : 1 }}
    />
  );
};
