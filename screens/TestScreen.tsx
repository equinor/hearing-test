import { Button } from "@equinor/mad-components";
import NetInfo from "@react-native-community/netinfo";
import { Spinner } from "mad-expo-core";
import PropTypes from "prop-types";
import { Component } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sound from "react-native-sound";
import SystemSetting from "react-native-system-setting";
import { connect } from "react-redux";

import BigRoundButton from "../components/common/atoms/BigRoundButton";
import { MenuItem } from "../components/common/atoms/MenuItem";
import ProgressBar from "../components/common/atoms/ProgressBar";
import Typography from "../components/common/atoms/Typography";
import { TestCard } from "../components/common/molecules/TestCard";
import { getEnvironment } from "../constants/settings";
import { SYSTEM_VOLUME } from "../constants/sounds";
import store from "../store/config";
import {
  failure,
  postTakeTest,
  postTest,
  startTest,
  stopTest,
  success,
} from "../store/test/actions";
import {
  selectIsFetching,
  selectError,
  selectNode,
  selectTest,
  selectTestIsFinished,
  selectTestIsRunning,
} from "../store/test/reducer";
import { confirmationDialog } from "../utils/alerts";
import { createSoundFile } from "../utils/sound";

const isProduction = getEnvironment() === "prod";

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
    this.silentAudioClip = new Sound(
      require("../assets/audio/1000Hz_dobbel.wav")
    );

    this.demoModeSound = new Sound(
      require("../assets/audio/1000Hz_dobbel.wav")
    );

    this.sounds = {};
  }

  state = {
    intervalId: "",
    reactionTimeMs: null,
    numberOfPresses: 0,
    modalVisible: false,
    pauseAfterNode: false,
    nextNodeWaiting: false,
    initialSystemVolume: SYSTEM_VOLUME,
    isPlayingFirstNodeFirstTime: true,
    numberOfNodesPlayed: 0,
    numberOfNodes: Infinity,
    isDoneLoadingSounds: false,
    isDemoMode: store.getState().appConfig.isDemoMode,
    isVolumeMuted: false,
    isConnected: null,
    netInfoEventListener: null,
  };

  componentDidMount() {
    this.setState({
      netInfoEventListener: NetInfo.addEventListener(({ isConnected }) =>
        this.setState({ isConnected })
      ),
    });
    this.props.actionPostTakeTest();
    const setInitialDeviceSystemVolume = async () =>
      await SystemSetting.getVolume()
        .then((volume) => {
          this.setState({ initialSystemVolume: volume });
        })
        .catch((err) => console.log({ err }));
    setInitialDeviceSystemVolume();
    SystemSetting.setVolume(SYSTEM_VOLUME, { showUI: false });
  }

  componentWillUnmount() {
    this.state.netInfoEventListener();
  }

  getSoundFile(hz: number) {
    if (this.state.isDemoMode) return this.demoModeSound;

    return this.sounds[`sound${hz}hz`];
  }

  releaseSoundFiles() {
    Object.keys(this.sounds).forEach((key) => {
      this.sounds[key].stop();
      this.sounds[key].release();
    });

    this.silentAudioClip.stop();
    this.silentAudioClip.release();
    this.isPlayingSilentAudioClip = false;

    this.demoModeSound.stop();
    this.demoModeSound.release();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isVolumeMuted && this.state.isVolumeMuted) {
      SystemSetting.setVolume(0, { showUI: false });
    } else if (prevState.isVolumeMuted && !this.state.isVolumeMuted) {
      SystemSetting.setVolume(SYSTEM_VOLUME, { showUI: false });
    }

    // Fetch test when reconnected
    if (
      this.state.isConnected &&
      !this.props.isFetching &&
      Object.keys(this.props.test).length === 0
    ) {
      this.props.actionPostTakeTest();
    }

    // Load sounds
    if (!this.state.isDoneLoadingSounds && this.props.test.sounds) {
      if (!this.state.isDemoMode) {
        this.props.test.sounds.forEach((sound) => {
          this.sounds[`sound${sound.hz}hz`] = createSoundFile(sound.uri);
        });
      }
      this.setState({ isDoneLoadingSounds: true });
    }

    if (
      !this.props.testIsFinished &&
      (this.props.node !== prevProps.node || this.state.nextNodeWaiting)
    ) {
      if (
        !this.state.pauseAfterNode &&
        !this.state.modalVisible &&
        this.props.testIsRunning
      ) {
        if (
          prevProps.node.data?.index !== 1 &&
          this.props.node.data?.index === 1
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

    // Test is finished
    if (!prevProps.testIsFinished && this.props.testIsFinished) {
      this.releaseSoundFiles();
      Sound.setActive(false);
      this.props.actionPostTest(this.props.test);
      this.props.navigation.navigate("TestResultRoute");
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

  stopTest() {
    clearInterval(this.state.intervalId);
    this.props.actionStopTest();
    this.setState({ modalVisible: false });
    this.setState({ numberOfNodesPlayed: 0 });
  }

  abortTest() {
    this.releaseSoundFiles();
    Sound.setActive(false);
    this.stopTest();
  }

  restartTest() {
    this.stopTest();
    this.props.actionStartTest();
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
    SystemSetting.setVolume(SYSTEM_VOLUME, { showUI: false });

    // Setting playback volume
    sound.setVolume(node.stimulusMultiplicative);
    sound.setPan(node.panning);
    sound.play(() => {
      SystemSetting.setVolume(this.state.initialSystemVolume, {
        showUI: false,
      });
    });
  }

  // Used for the progress bar
  setNumberOfNodesPlayed() {
    if (this.state.success) {
      this.setState((prevState) => ({
        numberOfNodesPlayed: prevState.numberOfNodesPlayed + 1,
      }));
    } else {
      // The first node in a sub-test is played twice if the first playback is not registered as a success
      // We only want to register that a node has been played when it's moving on to the next node
      if (!this.state.isPlayingFirstNodeFirstTime) {
        this.setState((prevState) => ({
          numberOfNodesPlayed: prevState.numberOfNodesPlayed + 1,
        }));
      }
    }
  }

  // Used for the progress bar
  setNumberOfNodes() {
    const subTests = this.props.test.subTests;
    let numberOfNodes = 0;
    for (let i = 0; i < subTests.length; i++) {
      let node = subTests[i];
      while (node) {
        numberOfNodes++;
        // There are the same number of success- and failure nodes so I just chose success
        node = node.success;
      }
    }
    // The leaf nodes are not test nodes
    numberOfNodes -= subTests.length;
    this.setState({ numberOfNodes });
  }

  renderBigRoundButton() {
    const { actionStartTest, isFetching, node, testIsRunning } = this.props;
    const { modalVisible, pauseAfterNode, isDoneLoadingSounds } = this.state;
    if (isFetching || !isDoneLoadingSounds || pauseAfterNode || modalVisible)
      return <Spinner />;
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
          this.playSilentAudioClip();
          this.setNumberOfNodes();
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

  runNode(node) {
    //this.playSilentAudioClip();
    if (node && node.data && node.data.sound) {
      // Load the audio for current node
      // and wait with starting the node-timer until the sound is ready.
      const sound = this.getSoundFile(node.data.sound.hz);
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
          this.setNumberOfNodesPlayed();
        }
      }, intervalSpeed);
      this.setState({ intervalId });
    }
  }

  render() {
    if (
      this.state.isConnected === false &&
      Object.keys(this.props.test).length === 0
    )
      return (
        <SafeAreaView style={{ flex: 1, padding: 24 }}>
          <TestCard isConnected={false} />
        </SafeAreaView>
      );

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ProgressBar
          percentDone={
            (this.state.numberOfNodesPlayed / this.state.numberOfNodes) * 100
          }
          disabled={!this.props.testIsRunning}
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
            <Button.Icon
              name={this.state.isVolumeMuted ? "volume-mute" : "volume-high"}
              onPress={() =>
                this.setState((prevState) => ({
                  isVolumeMuted: !prevState.isVolumeMuted,
                }))
              }
              variant="ghost"
              disabled={isProduction}
              style={{ opacity: isProduction ? 0 : 1 }}
            />
            <Typography variant="h1">Hørselstest</Typography>
            {this.props.testIsRunning ? (
              <Button.Icon
                name={this.state.pauseAfterNode ? "timer-sand-empty" : "pause"}
                onPress={() => {
                  this.setState({ pauseAfterNode: true });
                }}
                variant="ghost"
              />
            ) : (
              <View style={{ width: 40, height: 40 }} />
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
                    onPress={() =>
                      confirmationDialog(
                        "Avslutte hørselstesten?",
                        () => {
                          this.abortTest();
                          this.props.navigation.navigate("DefaultRoute");
                        },
                        "Da må du begynne på nytt neste gang"
                      )
                    }
                  />
                  <MenuItem
                    icon="refresh"
                    text="Start hørselstesten på ny"
                    onPress={() =>
                      confirmationDialog(
                        "Starte hørselstesten på ny?",
                        () => {
                          this.restartTest();
                          this.props.navigation.navigate("TestRoute");
                        },
                        "Dette vil slette all data fra denne testen"
                      )
                    }
                  />
                  <MenuItem
                    icon="school"
                    text="Ta ny lydsjekk"
                    onPress={() =>
                      confirmationDialog(
                        "Ta ny lydsjekk?",
                        () => {
                          this.abortTest();
                          this.props.navigation.navigate("SoundCheckRoute");
                        },
                        "Dette vil slette all data fra denne testen"
                      )
                    }
                  />
                  <Button
                    title="Fortsette hørselstesten"
                    onPress={() => this.setState({ modalVisible: false })}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    padding: 16,
    paddingBottom: 60,
  },
});

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
