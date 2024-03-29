import { Button, Typography } from "@equinor/mad-components";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import NavigationItem from "../components/common/atoms/NavigationItem";
import { SlideModal } from "../components/common/molecules/SlideModal";
import { TestCard } from "../components/common/molecules/TestCard";
import { TestResultsModal } from "../components/common/molecules/TestResultsModal";
import { fetchMe } from "../services/api/api-methods";
import { RootStackScreenProps, User } from "../types";
import { openURL } from "../utils/linking";

type DefaultScreenProps = RootStackScreenProps<"Root">;

export const DefaultScreen = ({ navigation }: DefaultScreenProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isTestResultsModalVisible, setIsTestResultsModalVisible] =
    useState(false);
  const { isConnected } = useNetInfo();

  useEffect(() => {
    if (isConnected && !user) {
      fetchMe().then((user) => setUser(user));
    }
  }, [isConnected]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Typography variant="h2" color="primary" style={styles.greeting}>
          Hei{user ? ` ${user.firstName}` : ""},
        </Typography>
        <View style={styles.location}>
          <Typography variant="h5" color="primary">
            Din lokasjon er {user ? user.location : "ukjent"}
          </Typography>
          <Button.Icon
            name="help-circle"
            onPress={() => setIsLocationModalVisible(true)}
            variant="ghost"
            style={styles.locationButton}
          />
        </View>
        <TestCard isConnected={isConnected} navigation={navigation} />
        {isConnected ? (
          <>
            <Typography variant="h5" color="primary" style={styles.overview}>
              Oversikt
            </Typography>
            {/* TODO: <NavigationItem title="Informasjon om testen" /> */}
            <NavigationItem
              onPress={() => setIsTestResultsModalVisible(true)}
              title="Dine resultater"
            />
            <NavigationItem
              onPress={() =>
                openURL(
                  "https://forms.office.com/Pages/ResponsePage.aspx?id=NaKkOuK21UiRlX_PBbRZsC9rzeD3BlFJi0JbArgz2wRURUxPWVRWUVBPSlVYUVc5UElIQjJXMFRSWS4u"
                )
              }
              title="Gi tilbakemelding"
            />
          </>
        ) : null}
      </View>

      <TestResultsModal
        visible={isTestResultsModalVisible}
        setInvisible={() => setIsTestResultsModalVisible(false)}
      />
      <SlideModal
        title="Din lokasjon"
        visible={isLocationModalVisible}
        setInvisible={() => setIsLocationModalVisible(false)}
      >
        <Typography>Du kan oppdatere lokasjonen din i SAP.</Typography>
      </SlideModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: 24,
  },
  greeting: {
    marginHorizontal: 4,
    marginBottom: -6,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    marginBottom: 18,
  },
  locationButton: {
    position: "relative",
    left: -4,
    marginBottom: 4,
  },
  overview: { marginTop: 32, marginBottom: 16, marginHorizontal: 4 },
});
