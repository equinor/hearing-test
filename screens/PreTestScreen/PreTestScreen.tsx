import { Button } from "@equinor/mad-components";
import { Typography } from "mad-expo-core";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePreTestPages } from "./hooks/usePreTestPages";
import { ButtonGroup } from "../../components/common/atoms/ButtonGroup";
import { Indicators } from "../../components/common/molecules/Indicators";
import { MOSS_GREEN_100, TEXT } from "../../constants/colors";
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
                () => navigation.navigate("DefaultRoute"),
                "Da må du begynne på nytt neste gang"
              )
            }
            variant="ghost"
          />
        </View>
        <Typography variant="h1" color={MOSS_GREEN_100} style={styles.title}>
          {page.title}
        </Typography>
        <Image source={page.image} style={styles.image} />
        {page.hideIndicators ? null : (
          <Indicators iterable={pages} style={styles.indicators} />
        )}
        <Typography
          numberOfLines={4}
          size={18}
          color={TEXT}
          style={styles.description}
        >
          {page.description}
        </Typography>
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
    height: 24 * 4,
    lineHeight: 24,
  },
});
