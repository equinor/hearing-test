import { MaterialIcons as Icon } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import Sound from "react-native-sound";
import SystemSetting from "react-native-system-setting";
import { connect } from "react-redux";

import { EQUINOR_GREEN, GRAY_BACKGROUND } from "../../constants/colors";
import ButtonEDS from "../components/common/EDS/Button";
import IconButton from "../components/common/EDS/IconButton";
import BigRoundButton from "../components/common/atoms/BigRoundButton";
import Typography from "../components/common/atoms/Typography";
import ProgressAnimationBar from "../components/common/molecules/ProgressAnimationBar";
import { SoundCheckPageJSON } from "../types";

const styles = StyleSheet.create({
  component: {
    display: "flex",
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
    padding: 16,
    paddingBottom: 60,
  },
});

const ANIMATION_DURATION = 500;

// TODO: prop types
const SoundCheckPage = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sound, setSound] = useState<Sound>(null);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (opacityAnim)
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
  }, [opacityAnim, currentPage]);

  useEffect(() => {
    setSound(
      new Sound(
        require("../../assets/audio/1000Hz_dobbel.wav"),
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
    SystemSetting.setVolume(0.5, { showUI: true });
  }, []);

  const pages: SoundCheckPageJSON[] = [
    {
      title: "Lydsjekk",
      description:
        "Før vi startet testen tar vi en prøverunde. Lydsjekken tar for seg et øre om gangen.",
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
    // SystemSetting.setVolume(0.5, { showUI: true }); //Todo: Disabling this until we know how the calibration step should be done..
    sound.setVolume(1);
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
    <View style={{ height: "100%", backgroundColor: GRAY_BACKGROUND }}>
      <Animated.View
        style={{
          height: "100%",
          backgroundColor: GRAY_BACKGROUND,
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
              onPress={() => {
                Alert.alert(
                  "Avslutte lydsjekk?",
                  "Da må du begynne på nytt neste gang",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "default",
                    },
                    {
                      text: "Avslutt",
                      onPress: () => props.navigation.navigate("DefaultRoute"),
                      style: "destructive",
                    },
                  ]
                );
              }}
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
            style={{ display: "flex" }}
          >
            <SafeAreaView style={{ display: "flex" }}>
              <View
                style={{
                  backgroundColor: GRAY_BACKGROUND,
                  borderRadius: 4,
                  padding: 16,
                  paddingBottom: 60,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // flex: 1,
                  height: "100%",
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
              </View>
            </SafeAreaView>
          </Modal>
        </View>
      </Animated.View>
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SoundCheckPage);
