import { BarCodeScanner } from "expo-barcode-scanner";
import { IconButton, Typography } from "mad-expo-core";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MOSS_GREEN_100 } from "../constants/colors";
import { RootStackScreenProps } from "../types";

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

  const onClose = () => {
    Alert.alert("Avslutte lydsjekk?", "Da må du begynne på nytt neste gang", [
      {
        text: "Nei",
        style: "cancel",
      },
      {
        text: "Ja",
        onPress: () => navigation.navigate("DefaultRoute"),
        style: "destructive",
      },
    ]);
  };

  let noPermissionText;
  if (hasPermission === null) {
    noPermissionText = "Spør om tilgang til kamera";
  } else if (hasPermission === false) {
    noPermissionText = "Ingen tilgang til kamera";
  }

  return (
    <View style={styles.container}>
      <IconButton
        name="close"
        onPress={onClose}
        color={hasPermission ? "white" : MOSS_GREEN_100}
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
          {noPermissionText}
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
