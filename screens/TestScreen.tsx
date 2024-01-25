import { Button, LinearProgress, Typography } from "@equinor/mad-components";
import { Dialog } from "@equinor/mad-components/dist/components/Dialog";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BigRoundButton from "../components/common/atoms/BigRoundButton";
import { MenuItem } from "../components/common/atoms/MenuItem";
import { MuteButton } from "../components/common/atoms/MuteButton";
import { Loading } from "../components/common/molecules/Loading";
import { TestCard } from "../components/common/molecules/TestCard";
import { VolumeProvider } from "../contexts/VolumeContext";
import { useHearingTest } from "../hooks/useHearingTest";
import { RootStackScreenProps } from "../types";
import { confirmationDialog } from "../utils/alerts";

type TestScreenProps = RootStackScreenProps<"TestRoute">;

export const TestScreen = ({ navigation }: TestScreenProps) => {
  const {
    isDialogOpen,
    isLoading,
    pauseAfterNode,
    progress,
    registerPress,
    restartTest,
    setIsDialogOpen,
    setPauseAfterNode,
    showOfflineCard,
    startTest,
    stopTest,
    testIsRunning,
  } = useHearingTest();

  const BottomButton = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (!testIsRunning) {
      return (
        <BigRoundButton
          variant="secondary"
          text="Trykk for å starte"
          onPress={startTest}
        />
      );
    }

    return (
      <BigRoundButton
        variant="primary"
        text="Jeg hører lyden"
        onPress={registerPress}
      />
    );
  };

  if (showOfflineCard) {
    return (
      <SafeAreaView style={styles.container}>
        <TestCard isConnected={false} />
      </SafeAreaView>
    );
  }

  return (
    <VolumeProvider>
      <SafeAreaView style={styles.container}>
        <LinearProgress
          value={progress}
          style={[
            styles.linearProgress,
            {
              opacity: testIsRunning ? 1 : 0,
            },
          ]}
        />
        <View style={styles.headerRow}>
          <MuteButton isVisible={testIsRunning} />
          <Typography variant="h2" color="primary">
            Hørselstest
          </Typography>
          <Button.Icon
            name={pauseAfterNode ? "timer-sand-empty" : "pause"}
            onPress={() => setPauseAfterNode(true)}
            variant="ghost"
            disabled={!testIsRunning}
            style={{ opacity: testIsRunning ? 1 : 0 }}
          />
        </View>
        <View style={styles.subheadingAndButtonContainer}>
          <Typography style={styles.subheading}>
            {testIsRunning
              ? "Trykk på sirkelen under når du hører en lyd"
              : "Trykk på sirkelen under når du er klar for å starte hørselstesten."}
          </Typography>
          <BottomButton />
        </View>
      </SafeAreaView>
      <Dialog isOpen={isDialogOpen}>
        <Dialog.CustomContent>
          <MenuItem
            icon="close"
            text="Avslutte testen"
            onPress={() =>
              confirmationDialog(
                "Avslutte hørselstesten?",
                () => {
                  stopTest();
                  navigation.navigate("DefaultRoute");
                },
                "Da må du begynne på nytt neste gang",
                () => setIsDialogOpen(true)
              )
            }
          />
          <MenuItem
            icon="replay"
            text="Start hørselstesten på ny"
            onPress={() =>
              confirmationDialog(
                "Starte hørselstesten på ny?",
                restartTest,
                "Dette vil slette all data fra denne testen",
                () => setIsDialogOpen(true)
              )
            }
          />
          <MenuItem
            icon="headphones"
            text="Ta ny lydsjekk"
            onPress={() =>
              confirmationDialog(
                "Ta ny lydsjekk?",
                () => {
                  stopTest();
                  navigation.navigate("SoundCheckRoute");
                },
                "Dette vil slette all data fra denne testen",
                () => setIsDialogOpen(true)
              )
            }
          />
          <Button
            title="Fortsette hørselstesten"
            onPress={() => setIsDialogOpen(false)}
            style={styles.continueHearingTestButton}
          />
        </Dialog.CustomContent>
      </Dialog>
    </VolumeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 60,
  },
  linearProgress: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  subheadingAndButtonContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
  },
  subheading: { textAlign: "center" },
  continueHearingTestButton: { marginTop: 14, marginBottom: 16 },
});
