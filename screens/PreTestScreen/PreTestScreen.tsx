import { Button, Typography } from "@equinor/mad-components";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePreTestPages } from "./hooks/usePreTestPages";
import { ButtonGroup } from "../../components/common/atoms/ButtonGroup";
import { Indicators } from "../../components/common/molecules/Indicators";
import { RootStackScreenProps } from "../../types";
import { confirmationDialog } from "../../utils/alerts";
import { BarCodeScannerScreen } from "../BarCodeScannerScreen";

type PreTestScreenProps = RootStackScreenProps<"PreTestRoute">;

export const PreTestScreen = ({ navigation }: PreTestScreenProps) => {
  const { page, pages, nextPage } = usePreTestPages(navigation);

  if (page.title === "Skann") {
    return (
      <BarCodeScannerScreen
        navigation={navigation}
        onBarcodeMatch={() => nextPage(2)}
        onBarcodeMismatch={() => nextPage()}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.closeButton}>
          <Button.Icon
            name="close"
            onPress={() =>
              confirmationDialog(
                "Avslutte?",
                () => navigation.navigate("Root"),
                "Da må du begynne på nytt neste gang"
              )
            }
            variant="ghost"
          />
        </View>
        <Typography variant="h2" color="primary" style={styles.title}>
          {page.title}
        </Typography>
        <Image source={page.image} style={styles.image} />
        {page.hideIndicators ? null : (
          <Indicators iterable={pages} style={styles.indicators} />
        )}
        <Typography style={styles.description}>{page.description}</Typography>
        <ButtonGroup>
          {page.buttons.map((props) => (
            <Button key={props.title} {...props} style={styles.button} />
          ))}
        </ButtonGroup>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  button: { width: 160 },
  closeButton: { alignSelf: "flex-end", marginBottom: 16 },
  title: { textAlign: "center", marginBottom: 40 },
  image: { height: 250, resizeMode: "contain", alignSelf: "center" },
  indicators: { marginVertical: 32 },
  description: {
    textAlign: "center",
    marginBottom: 32,
  },
});
