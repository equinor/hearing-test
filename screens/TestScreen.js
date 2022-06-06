import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Spinner } from "mad-expo-core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sound from "react-native-sound";
import SystemSetting from "react-native-system-setting";
import { connect } from "react-redux";

import ButtonEDS from "../components/common/EDS/Button";
import IconButton from "../components/common/EDS/IconButton";
import BigRoundButton from "../components/common/atoms/BigRoundButton";
import Typography from "../components/common/atoms/Typography";
import ProgressAnimationBar from "../components/common/molecules/ProgressAnimationBar";
import { selectIsFetching } from "../store/test";
import {
  failure,
  postTakeTest,
  postTest,
  startTest,
  stopTest,
  success,
} from "../store/test/actions";
import {
  selectError,
  selectNode,
  selectTest,
  selectTestIsFinished,
  selectTestIsRunning,
} from "../store/test/reducer";

const styles = StyleSheet.create({
  component: {
    display: "flex",
    flex: 1,
    padding: 16,
    paddingBottom: 60,
  },
});

class TestScreen extends Component {
  static propTypes = {
    // Actions
    actionFailure: PropTypes.func.isRequired,
    actionPostTakeTest: PropTypes.func.isRequired,
    actionPostTest: PropTypes.func.isRequired,
    actionStartTest: PropTypes.func.isRequired,
    actionStopTest: PropTypes.func.isRequired,
    actionSuccess: PropTypes.func.isRequired,
    // Selectors
    node: PropTypes.object.isRequired,
    test: PropTypes.object.isRequired,
    testIsFinished: PropTypes.bool.isRequired,
    testIsRunning: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    // TODO
  };

  constructor() {
    super();

    // Setup the playback
    Sound.setCategory("Playback");
    Sound.setMode("Measurement");
    Sound.setActive(true);

    // Pre-load audio file from `assets/audio`
    this.silentAudioClip = new Sound("1000Hz_dobbel.wav", Sound.MAIN_BUNDLE);
  }

  state = {
    intervalId: "",
    reactionTimeMs: null,
    numberOfPresses: 0,
    modalVisible: false,
    pauseAfterNode: false,
    nextNodeWaiting: false,
    initialSystemVolume: 0.5,
    isPlayingFirstNodeFirstTime: true,
  };

  componentDidMount() {
    this.props.actionPostTakeTest();
    const setInitialDeviceSystemVolume = async () =>
      await SystemSetting.getVolume()
        .then((volume) => {
          this.setState({ initialSystemVolume: volume });
        })
        .catch((err) => console.log({ err }));
    setInitialDeviceSystemVolume();
    SystemSetting.setVolume(0.5, { showUI: true });
  }

  componentDidUpdate(prevProps) {
    if (this.props.node !== prevProps.node || this.state.nextNodeWaiting) {
      if (
        !this.state.pauseAfterNode &&
        !this.state.modalVisible &&
        this.props.testIsRunning
      ) {
        if (
          Object.keys(prevProps.node).length > 0 &&
          prevProps.node.data.index !== 1 &&
          this.props.node.data.index === 1
        ) {
          this.setState({ isPlayingFirstNodeFirstTime: true });
        }
        this.runNode(this.props.node);
        if (this.state.nextNodeWaiting)
          this.setState({ nextNodeWaiting: false }); // eslint-disable-line react/no-did-update-set-state
      } else if (!this.state.nextNodeWaiting) {
        this.setState({
          nextNodeWaiting: true,
          pauseAfterNode: false,
          modalVisible: true,
        }); // eslint-disable-line react/no-did-update-set-state
      }
    }
    if (this.props.testIsFinished !== prevProps.testIsFinished) {
      if (this.props.testIsFinished) {
        //this.stopSilentAudioClip();
        Sound.setActive(false);
        this.props.actionPostTest(this.props.test);
        this.props.navigation.navigate("TestResultRoute");
      }
    }
  }

  onSwipeUp() {
    this.hideAbortTestSection();
  }

  registerPress(node) {
    if (!!node && !!node.data) {
      const reactionTimeMs = this.timer - node.data.preDelayMs;
      // We register a press if it was done in the postDelay window
      if (
        this.timer > node.data.preDelayMs &&
        this.timer < node.data.preDelayMs + node.data.postDelayMs &&
        !this.state.success
      ) {
        this.setState({ success: true, reactionTimeMs });
      }
    }
    this.setState((prevState) => ({
      numberOfPresses: prevState.numberOfPresses + 1,
    }));
  }

  abortTest() {
    //this.stopSilentAudioClip();
    Sound.setActive(false);
    clearInterval(this.state.intervalId);
    this.props.actionStopTest();
    this.setState({ modalVisible: false });
  }

  async nodeFinished(node) {
    const payload = {
      reactionTimeMs: this.state.reactionTimeMs,
      numberOfClicks: this.state.numberOfPresses,
      success: this.state.success,
      systemVolume: await SystemSetting.getVolume(),
      isPlayingFirstNodeFirstTime: this.state.isPlayingFirstNodeFirstTime,
    };
    if (this.state.success) {
      this.props.actionSuccess(payload);
    } else {
      this.props.actionFailure(payload);
    }

    // node.data.index === 1 seems redundant but it is needed
    if (node.data.index === 1 && this.state.isPlayingFirstNodeFirstTime) {
      this.setState({ isPlayingFirstNodeFirstTime: false });
    }
  }

  playAudioTest(node, sound) {
    // Setting master volume
    // Setting volume each time just to make sure the volume is not changed between plays
    // also, if headset was plugged in after componentDidMount() was called, we need to call this again
    //SystemSetting.setVolume(0.5, { showUI: true });

    // Setting playback volume
    sound.setVolume(node.stimulusMultiplicative);
    sound.setPan(node.panning);
    sound.play(() => {
      sound.release();
      //SystemSetting.setVolume(this.state.initialSystemVolume, { showUI: true });
    });
  }

  renderBigRoundButton() {
    const { actionStartTest, isFetching, node, testIsRunning } = this.props;
    const { modalVisible, pauseAfterNode } = this.state;
    if (isFetching || pauseAfterNode || modalVisible) return <Spinner />;
    if (testIsRunning)
      return (
        <BigRoundButton
          variant="primary"
          text="Jeg hører lyden"
          onPress={() => {
            /* Register click */
            this.registerPress(node);
          }}
        />
      );
    return (
      <BigRoundButton
        variant="secondary"
        text="Trykk for å starte"
        onPress={() => {
          /* Start */
          actionStartTest();
        }}
      />
    );
  }

  playSilentAudioClip() {
    if (!this.isPlayingSilentAudioClip) {
      this.isPlayingSilentAudioClip = true;
      this.silentAudioClip.setVolume(0);
      this.silentAudioClip.setNumberOfLoops(-1);
      this.silentAudioClip.play();
    }
  }

  stopSilentAudioClip() {
    this.isPlayingSilentAudioClip = false;
    this.silentAudioClip.stop();
    this.silentAudioClip.release();
  }

  runNode(node) {
    //this.playSilentAudioClip();
    if (node && node.data && node.data.sound) {
      // Load the audio for current node
      // and wait with starting the node-timer until the sound is ready.
      const sound = new Sound(node.data.sound.url, null, (error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error("failed to load the sound", error);
        } else {
          this.setState({
            numberOfPresses: 0,
            reactionTimeMs: null,
            success: false,
          });
          this.timer = 0;

          const startTime = new Date();
          const intervalSpeed = 1;
          let soundHasBeenPlayed = false;

          const intervalId = setInterval(() => {
            const { postDelayMs, preDelayMs } = node.data;

            if (this.timer > preDelayMs && !soundHasBeenPlayed) {
              this.playAudioTest(node.data, sound);
              soundHasBeenPlayed = true;
            }
            if (this.timer < preDelayMs + postDelayMs) {
              this.timer = new Date() - startTime;
            } else {
              clearInterval(intervalId);
              this.nodeFinished(node);
            }
          }, intervalSpeed);
          this.setState({ intervalId });
        }
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ProgressAnimationBar
            duration={0}
            timeout={0}
            disabled
            // TODO
            key="disabled until we figure out how to solve this"
          />

          <View style={styles.component}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 40,
              }}
            >
              <View style={{ width: 48, height: 48 }} />
              <Typography variant="h1">Hørselstest</Typography>
              {this.props.testIsRunning ? (
                <IconButton
                  icon={this.state.pauseAfterNode ? "hourglass-empty" : "pause"}
                  onPress={() => {
                    this.setState({ pauseAfterNode: true });
                  }}
                />
              ) : (
                <View style={{ width: 48, height: 48 }} />
              )}
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
                paddingBottom: 40,
              }}
            >
              <Typography variant="p" style={{ height: 18 * 3 }}>
                {!this.props.testIsRunning
                  ? "Trykk på sirkelen under når du er klar for å starte hørselstesten."
                  : "Trykk på sirkelen under når du hører en lyd"}
              </Typography>
              {this.renderBigRoundButton()}
            </View>
            <Modal
              animationType="fade"
              transparent
              visible={this.state.modalVisible}
              style={{ display: "flex" }}
            >
              <SafeAreaView style={{ display: "flex" }}>
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: 4,
                    padding: 16,
                    paddingBottom: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: 8,
                      borderRadius: 4,
                    }}
                  >
                    <MenuItem
                      icon="delete"
                      text="Avslutte testen"
                      onPress={() => {
                        Alert.alert(
                          "Avslutte hørselstesten?",
                          "Da må du begynne på nytt neste gang",
                          [
                            {
                              text: "Nei",
                              onPress: () => {},
                              style: "cancel",
                            },
                            {
                              text: "Ja",
                              onPress: () => {
                                this.abortTest();
                                this.props.navigation.navigate("DefaultRoute");
                              },
                              style: "destructive",
                            },
                          ]
                        );
                      }}
                    />
                    <MenuItem
                      icon="refresh"
                      text="Start på ny"
                      onPress={() => {
                        Alert.alert(
                          "Starte på nytt?",
                          "Dette vil slette all data fra denne testen",
                          [
                            {
                              text: "Nei",
                              onPress: () => {},
                              style: "cancel",
                            },
                            {
                              text: "Ja",
                              onPress: () => {
                                this.abortTest();
                                this.props.navigation.navigate("TestRoute");
                              },
                              style: "destructive",
                            },
                          ]
                        );
                      }}
                    />
                    <MenuItem
                      icon="school"
                      text="Ta ny lydsjekk"
                      onPress={() => {
                        Alert.alert(
                          "Ta ny lydsjekk?",
                          "Dette vil slette all data fra denne testen",
                          [
                            {
                              text: "Nei",
                              onPress: () => {},
                              style: "cancel",
                            },
                            {
                              text: "Ja",
                              onPress: () => {
                                this.abortTest();
                                this.props.navigation.navigate(
                                  "SoundCheckRoute"
                                );
                              },
                              style: "destructive",
                            },
                          ]
                        );
                      }}
                    />
                    <ButtonEDS
                      text="Fortsette hørselstesten"
                      onPress={() => this.setState({ modalVisible: false })}
                      style={{ width: "100%", margin: 0 }}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const MenuItem = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
      }}
      onPress={onPress}
    >
      <Icon
        name={icon}
        size={24}
        color="#6F6F6F"
        style={{ paddingRight: 12 }}
      />
      <Typography variant="p" style={{ flex: 1 }}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actionFailure: (reactionTimeMs) => dispatch(failure(reactionTimeMs)),
  actionPostTakeTest: () => dispatch(postTakeTest()),
  actionPostTest: (test) => dispatch(postTest(test)),
  actionStartTest: () => dispatch(startTest()),
  actionStopTest: () => dispatch(stopTest()),
  actionSuccess: (reactionTimeMs) => dispatch(success(reactionTimeMs)),
});

const mapStateToProps = (state) => ({
  error: selectError(state),
  isFetching: selectIsFetching(state),
  node: selectNode(state),
  test: selectTest(state),
  testIsFinished: selectTestIsFinished(state),
  testIsRunning: selectTestIsRunning(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);
