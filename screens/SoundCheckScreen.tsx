import { Button, Typography } from "@equinor/mad-components";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sound from "react-native-sound";
import SystemSetting from "react-native-system-setting";

import BigRoundButton from "../components/common/atoms/BigRoundButton";
import { ProgressAnimationBar } from "../components/common/molecules/ProgressAnimationBar";
import { EQUINOR_GREEN, GRAY_BACKGROUND } from "../constants/colors";
import { SYSTEM_VOLUME } from "../constants/sounds";
import { RootStackScreenProps, SoundCheckPageJSON } from "../types";
import { confirmationDialog } from "../utils/alerts";

const ANIMATION_DURATION = 500;

type SoundCheckScreenProps = RootStackScreenProps<"SoundCheckRoute">;

const SoundCheckScreen = ({ navigation }: SoundCheckScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sound, setSound] = useState<Sound | null>(null);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [initialSystemVolume, setInitialSystemVolume] = useState(SYSTEM_VOLUME);

  useEffect(() => {
    if (opacityAnim)
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
  }, [opacityAnim, currentPage]);

  useEffect(() => {
    const setInitialDeviceSystemVolume = async () =>
      await SystemSetting.getVolume()
        .then((volume) => {
          console.log({ success: true, volume });
          setInitialSystemVolume(volume);
        })
        .catch((err) => console.log({ err }));
    setInitialDeviceSystemVolume();

    setSound(
      new Sound(require("../assets/audio/1000Hz_dobbel.wav"), (error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log("failed to load the sound", error);
        }
      })
    );

    // change the volume
    Sound.setCategory("Playback");
    Sound.setMode("Measurement");
    Sound.setActive(true);

    SystemSetting.setVolume(SYSTEM_VOLUME, { showUI: false });
  }, []);

  const pages: SoundCheckPageJSON[] = [
    {
      title: "Lydsjekk",
      description:
        "Før vi starter testen tar vi en prøverunde. Lydsjekken tar for seg et øre om gangen.",
      button: "variant1",
      hearNoSoundButtonVisible: false,
      sound: {
        play: false,
      },
    },
    {
      title: "Venstre øre",
      description: "Trykk på sirkelen under når du hører en lyd",
      button: "variant2",
      hearNoSoundButtonVisible: true,
      sound: {
        play: true,
        ear: "left",
      },
    },
    {
      title: "Høyre øre",
      description: "Trykk på sirkelen under når du hører en lyd",
      button: "variant2",
      hearNoSoundButtonVisible: true,
      sound: {
        play: true,
        ear: "right",
      },
    },
  ];

  function nextPage() {
    if (currentPage + 1 === pages.length) {
      navigation.navigate("SoundCheckFinishedRoute");
      setCurrentPage(0);
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
      setTimeout(() => setCurrentPage(currentPage + 1), ANIMATION_DURATION);
    }
  }

  function playAudioTest(ear: "left" | "right") {
    // Setting volume each time just to make sure the volume is not changed between plays
    // also, if headset was plugged in after componentDidMount() was called, we need to call this again
    SystemSetting.setVolume(SYSTEM_VOLUME, { showUI: false });
    sound.setVolume(0.5);
    if (ear === "left") sound.setPan(-1);
    if (ear === "right") sound.setPan(1);
    sound.play((success) => {
      if (success) {
        // eslint-disable-next-line no-console
        console.log("successfully finished playing");
      } else {
        // eslint-disable-next-line no-console
        console.log("playback failed due to audio decoding errors");
      }
      SystemSetting.setVolume(initialSystemVolume, { showUI: false });
    });
  }

  const page = pages[currentPage];
  useEffect(() => {
    if (sound) {
      sound.stop();
      if (page.sound.play && !modalVisible) {
        // 1 second delay before playing animation
        setTimeout(
          () => playAudioTest(page.sound.ear),
          1000 + ANIMATION_DURATION
        );
      }
    }
  }, [currentPage, modalVisible]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={{
          height: "100%",
          opacity: opacityAnim,
        }}
      >
        <View style={styles.container}>
          <ProgressAnimationBar
            duration={1000 + (sound ? sound.getDuration() * 1000 : 0)}
            timeout={ANIMATION_DURATION}
            disabled={currentPage === 0}
            style={styles.progressBar}
            key={currentPage}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <View style={{ height: 40, width: 40 }} />
            <Typography variant="h2" color="primary">
              {page.title}
            </Typography>
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
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Typography>{page.description}</Typography>
            {page.button === "variant1" ? (
              <BigRoundButton
                variant="secondary"
                text="Trykk her for å starte"
                onPress={nextPage}
              />
            ) : (
              <CanHearSoundButton
                key={page.title}
                onPress={() => setTimeout(nextPage, 500)}
              />
            )}
            {page.hearNoSoundButtonVisible ? (
              <Button
                title="hører ingen lyd"
                onPress={() => setModalVisible(true)}
                style={styles.button}
              />
            ) : (
              <View style={{ height: 58 }} />
            )}
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
          >
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: GRAY_BACKGROUND,
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                }}
              >
                <View />
                <View>
                  <Typography
                    variant="h4"
                    color="primary"
                    style={{ textAlign: "center" }}
                  >
                    Hvis du ikke hører lyden
                  </Typography>
                  <Typography style={{ textAlign: "center" }}>
                    Sjekk at telefonen ikke er i stillemodus. Trekk ut
                    headsettet og hør om lyden spilles gjennom høyttalerne til
                    telefonen.
                  </Typography>
                </View>
                <Button
                  title="Prøv på ny"
                  onPress={() => {
                    setModalVisible(false);
                    setCurrentPage(0);
                  }}
                  style={styles.button}
                />
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const CanHearSoundButton = (props: { onPress: Function }) => {
  const [pressed, setPressed] = useState(false);
  return pressed ? (
    <Icon name="check" size={72} color={EQUINOR_GREEN} />
  ) : (
    <BigRoundButton
      text="Jeg hører lyden"
      variant="primary"
      onPress={() => {
        setPressed(true);
        props.onPress();
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 60,
  },
  progressBar: { marginBottom: 16 },
  button: { width: 160 },
});

export default SoundCheckScreen;
