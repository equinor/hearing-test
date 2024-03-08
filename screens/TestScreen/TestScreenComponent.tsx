import { Button, LinearProgress, Typography } from "@equinor/mad-components";
import { Dialog } from "@equinor/mad-components/dist/components/Dialog";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BigRoundButton } from "../../components/common/atoms/BigRoundButton";
import { MenuItem } from "../../components/common/atoms/MenuItem";
import { MuteButton } from "../../components/common/atoms/MuteButton";
import { Loading } from "../../components/common/molecules/Loading";
import { TestCard } from "../../components/common/molecules/TestCard";
import { useHearingNavigation } from "../../hooks/useHearingNavigation";
import { DIALOG, useHearingTest } from "../../hooks/useHearingTest";
import { confirmationDialog } from "../../utils/alerts";

export const TestScreenComponent = () => {
  const {
    isDialogOpen,
    isLoading,
    pauseAfterNode,
    progress,
    registerPress,
    restartTest,
    setDialog,
    setPauseAfterNode,
    showOfflineCard,
    startTest,
    testIsRunning,
  } = useHearingTest();
  const navigation = useHearingNavigation();

  const BottomButton = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (!testIsRunning) {
      return (
        <BigRoundButton
          variant="secondary"
          title="Trykk for å starte"
          onPress={startTest}
        />
      );
    }

    return (
      <BigRoundButton
        variant="primary"
        title="Jeg hører lyden"
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
    <>
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
            onPress={() => {
              setDialog(DIALOG.SUBDIALOG);
              confirmationDialog(
                "Avslutte hørselstesten?",
                () => navigation.navigate("Root"),
                "Da må du begynne på nytt neste gang",
                () => setDialog(DIALOG.OPEN)
              );
            }}
          />
          <MenuItem
            icon="replay"
            text="Start hørselstesten på ny"
            onPress={() => {
              setDialog(DIALOG.SUBDIALOG);
              confirmationDialog(
                "Starte hørselstesten på ny?",
                restartTest,
                "Dette vil slette all data fra denne testen",
                () => setDialog(DIALOG.OPEN)
              );
            }}
          />
          <MenuItem
            icon="headphones"
            text="Ta ny lydsjekk"
            onPress={() => {
              setDialog(DIALOG.SUBDIALOG);
              confirmationDialog(
                "Ta ny lydsjekk?",
                () => navigation.navigate("SoundCheckRoute"),
                "Dette vil slette all data fra denne testen",
                () => setDialog(DIALOG.OPEN)
              );
            }}
          />
          <Button
            title="Fortsette hørselstesten"
            onPress={() => setDialog(DIALOG.HIDDEN)}
            style={styles.continueHearingTestButton}
          />
        </Dialog.CustomContent>
      </Dialog>
    </>
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
