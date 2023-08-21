import { BarCodeScanner } from "expo-barcode-scanner";
import { Typography } from "mad-expo-core";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton } from "../components/common/EDS/IconButton";
import { RootStackScreenProps } from "../types";
import { confirmationDialog } from "../utils/alerts";

type Props = RootStackScreenProps<"PreTestRoute"> & {
  onBarcodeMatch: () => void;
  onBarcodeMismatch: () => void;
};

export const BarCodeScannerScreen: React.FC<Props> = ({
  navigation,
  onBarcodeMatch,
  onBarcodeMismatch,
}) => {
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
      <IconButton
        icon="close"
        onPress={() =>
          confirmationDialog(
            "Avslutte?",
            () => navigation.navigate("DefaultRoute"),
            "Da må du begynne på nytt neste gang"
          )
        }
        style={[
          styles.closeButton,
          {
            marginTop: insets.top + 24,
          },
        ]}
      />
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
