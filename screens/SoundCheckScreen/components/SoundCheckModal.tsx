import {
  Button,
  EDSStyleSheet,
  Typography,
  useStyles,
} from "@equinor/mad-components";
import { Modal, ModalProps, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../../constants/colors";

type SoundCheckModalProps = Pick<ModalProps, "visible"> & {
  onPressTryAgain: () => void;
};

export const SoundCheckModal = ({
  visible,
  onPressTryAgain,
}: SoundCheckModalProps) => {
  const styles = useStyles(themeStyles);

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <Button
              title="Placeholder button"
              style={styles.placeholderButton}
            />
            <View>
              <Typography variant="h5" color="primary" style={styles.title}>
                Hvis du ikke hører lyden
              </Typography>
              <Typography style={styles.description}>
                Sjekk at telefonen ikke er i stillemodus. Trekk ut headsettet og
                hør om lyden spilles gjennom høyttalerne til telefonen.
              </Typography>
            </View>
            <Button
              title="Prøv på ny"
              onPress={onPressTryAgain}
              style={styles.button}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

const themeStyles = EDSStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_BACKGROUND,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.container.paddingVertical,
    paddingHorizontal: theme.spacing.container.paddingHorizontal,
  },
  placeholderButton: { opacity: 0 },
  title: { textAlign: "center", marginBottom: 16 },
  description: { textAlign: "center" },
  button: { width: 160 },
}));
