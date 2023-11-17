import { Button } from "@equinor/mad-components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Typography } from "mad-expo-core";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootStackParamList } from "../types";
import { confirmationDialog } from "../utils/alerts";

type BarCodeScannerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "PreTestRoute">;
  onBarcodeMatch: () => void;
  onBarcodeMismatch: () => void;
};

export const BarCodeScannerScreen = ({
  navigation,
  onBarcodeMatch,
  onBarcodeMismatch,
}: BarCodeScannerScreenProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    if (data === "01122022") {
      onBarcodeMatch();
    } else {
      onBarcodeMismatch();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.closeButton,
          {
            marginTop: insets.top + 24,
          },
        ]}
      >
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
      {hasPermission ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <Typography style={{ textAlign: "center" }}>
          {hasPermission === null
            ? "Spør om tilgang til kamera"
            : "Ingen tilgang til kamera"}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: { alignSelf: "flex-end", margin: 24, zIndex: 1 },
});
