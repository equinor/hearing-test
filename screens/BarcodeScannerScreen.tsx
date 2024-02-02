import { Button, Typography } from "@equinor/mad-components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BarcodeScanningResult, Camera, CameraView } from "expo-camera/next";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootStackParamList } from "../types";
import { confirmationDialog } from "../utils/alerts";

type BarcodeScannerScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "PreTestRoute">;
  onBarcodeMatch: () => void;
  onBarcodeMismatch: () => void;
};

export const BarcodeScannerScreen = ({
  navigation,
  onBarcodeMatch,
  onBarcodeMismatch,
}: BarcodeScannerScreenProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
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
              () => navigation.navigate("Root"),
              "Da må du begynne på nytt neste gang"
            )
          }
          variant="ghost"
        />
      </View>
      {hasPermission ? (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barCodeTypes: ["ean8"],
          }}
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
