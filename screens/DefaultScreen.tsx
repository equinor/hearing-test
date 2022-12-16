import { useNetInfo } from "@react-native-community/netinfo";
import { Typography } from "mad-expo-core";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import IconButton from "../components/common/EDS/IconButton";
import NavigationItem from "../components/common/atoms/NavigationItem";
import { SlideModal } from "../components/common/molecules/SlideModal";
import { TestCard } from "../components/common/molecules/TestCard";
import TestResultsModal from "../components/common/molecules/TestResultsModal";
import { MOSS_GREEN_100 } from "../constants/colors";
import { fetchMe } from "../services/api/api-methods";
import { RootStackScreenProps, User } from "../types";
import { openURL } from "../utils/linking";

type Props = RootStackScreenProps<"DefaultRoute">;

export const DefaultScreen = ({ navigation }: Props) => {
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
        <Typography variant="h2" color={MOSS_GREEN_100} style={styles.greeting}>
          Hei{user ? ` ${user.firstName}` : ""},
        </Typography>
        <View style={styles.location}>
          <Typography variant="h5" color={MOSS_GREEN_100}>
            Din lokasjon er {user ? user.location : "ukjent"}
          </Typography>
          <IconButton
            icon="help"
            onPress={() => setIsLocationModalVisible(true)}
            style={styles.locationButton}
          />
        </View>
        <TestCard isConnected={isConnected} navigation={navigation} />
        {isConnected ? (
          <>
            <Typography
              variant="h5"
              color={MOSS_GREEN_100}
              style={styles.overview}
            >
              Din oversikt
            </Typography>
            {/* TODO: <NavigationItem title="Informasjon om testen" /> */}
            <NavigationItem
              onPress={() => setIsTestResultsModalVisible(true)}
              title="Mine resultater"
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
        title="Lokasjon"
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
    marginBottom: -10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    marginBottom: 18,
  },
  locationButton: {
    position: "relative",
    left: -8,
    marginBottom: 4,
  },
  overview: { marginTop: 32, marginBottom: 16, marginHorizontal: 4 },
});
