import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { BigRoundButton } from "../../../components/common/atoms/BigRoundButton";
import { EQUINOR_GREEN } from "../../../constants/colors";
import { Ear } from "../../../types";

type CanHearSoundButtonsProps = {
  onPressMatch: () => void;
  onPressMismatch: (ear: Ear) => void;
  earToCheck: Ear | undefined;
  wrongEarChosen: Ear | undefined;
};

export const SoundCheckButtons = ({
  onPressMatch,
  onPressMismatch,
  earToCheck,
  wrongEarChosen,
}: CanHearSoundButtonsProps) => {
  const [match, setMatch] = useState(false);

  const handleSelectEar = (ear: Ear) => {
    if (wrongEarChosen) return;

    if (ear === earToCheck) {
      setMatch(true);
      onPressMatch();
    } else {
      onPressMismatch(ear);
    }
  };

  if (match) {
    return <Icon name="check-circle-outline" size={64} color={EQUINOR_GREEN} />;
  }

  return (
    <View style={styles.container}>
      <BigRoundButton
        title="Venstre"
        onPress={() => handleSelectEar("left")}
        diameter={110}
        variant={wrongEarChosen === "left" ? "primary" : "secondary"}
      />
      <BigRoundButton
        title="Høyre"
        onPress={() => handleSelectEar("right")}
        diameter={110}
        variant={wrongEarChosen === "right" ? "primary" : "secondary"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 350,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
