import {
  Button,
  EDSStyleSheet,
  Typography,
  useStyles,
} from "@equinor/mad-components";
import { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SoundCheckButtons } from "./components/SoundCheckButtons";
import { SoundCheckModal } from "./components/SoundCheckModal";
import { useSoundCheck } from "./hooks/useSoundCheck";
import {
  SoundCheckButtonConfigurations,
  useSoundCheckPages,
} from "./hooks/useSoundCheckPages";
import { BigRoundButton } from "../../components/common/atoms/BigRoundButton";
import { ProgressAnimationBar } from "../../components/common/molecules/ProgressAnimationBar";
import { ANIMATION_DURATION } from "../../constants/animation";
import { useInitialSystemVolume } from "../../hooks/useInitialSystemVolume";
import { Ear, RootStackScreenProps } from "../../types";
import { confirmationDialog } from "../../utils/alerts";

type SoundCheckScreenProps = RootStackScreenProps<"SoundCheckRoute">;

export const SoundCheckScreen = ({ navigation }: SoundCheckScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [wrongEarChosen, setWrongEarChosen] = useState<Ear>();
  const { initialSystemVolume } = useInitialSystemVolume();

  const buttons: SoundCheckButtonConfigurations = {
    noSound: {
      title: "Hører ingen lyd",
      onPress: () => setModalVisible(true),
    },
    replay: {
      title: "Spill av igjen",
      onPress: () => setWrongEarChosen(undefined),
    },
  };

  const { animatedViewOpacity, currentPage, setCurrentPage, page, nextPage } =
    useSoundCheckPages(buttons, wrongEarChosen);

  const soundDisabled = modalVisible || !page.earToCheck;
  const playSoundDependencies = [modalVisible, page];
  const { sound } = useSoundCheck(
    initialSystemVolume,
    page.earToCheck,
    soundDisabled,
    playSoundDependencies
  );

  const styles = useStyles(themeStyles, { animatedViewOpacity });

  const CenterButton = () => {
    if (currentPage === 0) {
      return (
        <BigRoundButton
          title="Trykk her for å starte"
          onPress={nextPage}
          variant="secondary"
        />
      );
    }

    return (
      <SoundCheckButtons
        onPressMatch={() => setTimeout(nextPage, 500)}
        onPressMismatch={setWrongEarChosen}
        earToCheck={page.earToCheck}
        wrongEarChosen={wrongEarChosen}
      />
    );
  };

  const handleClose = () => {
    confirmationDialog(
      "Avslutte?",
      () => navigation.navigate("DefaultRoute"),
      "Da må du begynne på nytt neste gang"
    );
  };

  const handleTryAgain = () => {
    setCurrentPage(0);
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Animated.View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <ProgressAnimationBar
              key={`${currentPage}${wrongEarChosen}`}
              duration={1000 + (sound ? sound.getDuration() * 1000 : 0)}
              timeout={ANIMATION_DURATION}
              disabled={currentPage === 0 || !!wrongEarChosen}
              style={styles.progressAnimationBar}
            />
            <View style={styles.titleAndCloseButton}>
              <Button.Icon name="ghost" style={styles.buttonPlaceholder} />
              <Typography variant="h2" color="primary">
                {page.title}
              </Typography>
              <Button.Icon name="close" onPress={handleClose} variant="ghost" />
            </View>
            <Typography style={styles.description}>
              {page.description}
            </Typography>
          </View>
          <View style={styles.centerContainer}>
            <CenterButton />
          </View>
          <View style={styles.bottomContainer}>
            {page.bottomButton && (
              <Button {...page.bottomButton} style={styles.button} />
            )}
          </View>
        </Animated.View>
      </SafeAreaView>
      <SoundCheckModal
        visible={modalVisible}
        onPressTryAgain={handleTryAgain}
      />
    </>
  );
};

type ThemeStylesProps = {
  animatedViewOpacity: Animated.Value;
};

const themeStyles = EDSStyleSheet.create(
  (theme, { animatedViewOpacity }: ThemeStylesProps) => ({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      opacity: animatedViewOpacity,
      paddingVertical: theme.spacing.container.paddingVertical,
      paddingHorizontal: theme.spacing.container.paddingHorizontal,
    },
    topContainer: { flex: 1 },
    progressAnimationBar: {
      marginBottom: 16,
    },
    titleAndCloseButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 40,
    },
    buttonPlaceholder: { opacity: 0 },
    description: { textAlign: "center" },
    centerContainer: { alignItems: "center" },
    bottomContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    button: { width: 160 },
  })
);
