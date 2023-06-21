import { MaterialIcons as Icon } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sound from "react-native-sound";
import SystemSetting from "react-native-system-setting";
import { connect } from "react-redux";

import ButtonEDS from "../components/common/EDS/Button";
import { IconButton } from "../components/common/EDS/IconButton";
import BigRoundButton from "../components/common/atoms/BigRoundButton";
import Typography from "../components/common/atoms/Typography";
import ProgressAnimationBar from "../components/common/molecules/ProgressAnimationBar";
import { EQUINOR_GREEN, GRAY_BACKGROUND } from "../constants/colors";
import { SYSTEM_VOLUME } from "../constants/sounds";
import { SoundCheckPageJSON } from "../types";
import { onClose } from "../utils/alerts";

const styles = StyleSheet.create({
  component: {
    flex: 1,
    padding: 16,
    paddingBottom: 60,
  },
});

const ANIMATION_DURATION = 500;

// TODO: prop types
const SoundCheckScreen = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sound, setSound] = useState<Sound>(null);
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
      new Sound(
        require("../assets/audio/1000Hz_dobbel.wav"),
        //new Sound("1000Hz_dobbel.wav", Sound.MAIN_BUNDLE, Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log("failed to load the sound", error);
          }
        }
      )
    );

    // change the volume
    Sound.setCategory("Playback");
    Sound.setMode("Measurement");
    Sound.setActive(true);

    // Load the sound file 'testBell.wav' from the app bundle
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
      props.navigation.navigate("SoundCheckFinishedRoute");
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
    SystemSetting.setVolume(SYSTEM_VOLUME, { showUI: false }); //Todo: Disabling this until we know how the calibration step should be done..
    sound.setVolume(SYSTEM_VOLUME);
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
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            height: "100%",
            opacity: opacityAnim,
          }}
        >
          <ProgressAnimationBar
            duration={1000 + (sound ? sound.getDuration() * 1000 : 0)}
            timeout={ANIMATION_DURATION}
            disabled={currentPage === 0}
            key={currentPage}
          />

          <View style={styles.component}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 40,
              }}
            >
              <View style={{ width: 48, height: 48 }} />
              <Typography variant="h1">{page.title}</Typography>
              <IconButton
                icon="close"
                onPress={() =>
                  onClose(() => props.navigation.navigate("DefaultRoute"))
                }
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
              <Typography variant="p" style={{ height: 18 * 3 }}>
                {page.description}
              </Typography>
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
                <ButtonEDS
                  text="hører ingen lyd"
                  onPress={() => setModalVisible(true)}
                />
              ) : (
                <View style={{ height: 58 }} />
              )}
            </View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
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
                    <Typography variant="h2" style={{ textAlign: "center" }}>
                      Hvis du ikke hører lyden
                    </Typography>
                    <Typography variant="p" style={{ textAlign: "center" }}>
                      Sjekk at telefonen ikke er i stillemodus. Trekk ut
                      headsettet og hør om lyden spilles gjennom høyttalerne til
                      telefonen.
                    </Typography>
                  </View>
                  <ButtonEDS
                    onPress={() => {
                      setModalVisible(false);
                      setCurrentPage(0);
                    }}
                    text="Prøv på ny"
                  />
                </ScrollView>
              </SafeAreaView>
            </Modal>
          </View>
        </Animated.View>
      </View>
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

const mapDispatchToProps = () => ({
  // TODO
});

const mapStateToProps = () => ({
  // TODO
});

export default connect(mapStateToProps, mapDispatchToProps)(SoundCheckScreen);
