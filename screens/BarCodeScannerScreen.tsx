import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import { RootStackScreenProps } from "../types";

type Props = RootStackScreenProps<"PreTestRoute"> & {
  onFailure: () => void;
  onSuccess: () => void;
};

export const BarCodeScannerScreen = ({ onFailure, onSuccess }: Props) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

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
      onSuccess();
    } else {
      onFailure();
    }
  };

  if (hasPermission === null) {
    return <Text>Spør om tilgang til kamera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Ingen tilgang til kamera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
