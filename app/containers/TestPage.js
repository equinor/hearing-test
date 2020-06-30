import React, { Component } from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import GestureRecognizer from 'react-native-swipe-gestures';
// import SystemSetting from 'react-native-system-setting';
import { defaultNavOptions } from '../navigation';
import ButtonEDS from '../components/common/EDS/Button';
import BigRoundButton from '../components/common/atoms/BigRoundButton';
import { navigate } from '../navigation/service';
import {
  selectError,
  selectNode,
  selectTest,
  selectTestIsFinished,
  selectTestIsRunning,
} from '../store/test/reducer';
import { failure, fetchTest, postTest, startTest, stopTest, success } from '../store/test/actions';
import { selectIsFetching } from '../store/test';
import { STOP } from '../stylesheets/colors';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
});

class TestPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...defaultNavOptions,
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsRoute')}
        style={{ paddingLeft: 15, paddingRight: 15 }}
      >
        <Icon name="md-more" color="white" size={24} />
      </TouchableOpacity>
    ),
    headerLeft: null,
  });

  static propTypes = {
    // Actions
    actionFailure: PropTypes.func.isRequired,
    actionFetchTest: PropTypes.func.isRequired,
    actionPostTest: PropTypes.func.isRequired,
    actionStartTest: PropTypes.func.isRequired,
    actionStopTest: PropTypes.func.isRequired,
    actionSuccess: PropTypes.func.isRequired,
    // Selectors
    error: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
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
    Sound.setCategory('Playback');
    Sound.setMode('Measurement');
    Sound.setActive(true);

    // Pre-load audio file from `assets/audio`
    this.silentAudioClip = new Sound('1000Hz_dobbel.wav', Sound.MAIN_BUNDLE);
  }

  state = {
    pushRegistered: false,
    showStopTheTestSection: false,
    intervalId: '',
    reactionTimeMs: null,
    numberOfPresses: 0,
    errorMessage: null,
  };

  componentDidMount() {
    this.props.actionFetchTest();
  }

  componentDidUpdate(prevProps) {
    if (this.props.node !== prevProps.node) {
      this.runNode(this.props.node);
    }
    if (this.props.testIsFinished !== prevProps.testIsFinished) {
      if (this.props.testIsFinished) {
        this.stopSilentAudioClip();
        Sound.setActive(false);
        this.props.actionPostTest(this.props.test);
        navigate('TestResultRoute');
      }
    }
  }

  onSwipeUp() {
    this.hideAbortTestSection();
  }

  registerPress(node) {
    this.showClickFeedbackMessage();
    if (!!node && !!node.data) {
      const reactionTimeMs = this.timer - node.data.preDelayMs;
      // We register a press if it was done in the postDelay window
      if (
        this.timer > node.data.preDelayMs &&
        this.timer < node.data.preDelayMs + node.data.postDelayMs
      ) {
        this.setState({ success: true });
      }
      this.setState({ reactionTimeMs, numberOfPresses: this.state.numberOfPresses + 1 });
    }
  }

  showClickFeedbackMessage() {
    this.setState({ pushRegistered: true });
    if (this.clickRegisteredTimeoutId) {
      clearTimeout(this.clickRegisteredTimeoutId);
    }
    this.clickRegisteredTimeoutId = setTimeout(
      () => this.setState({ pushRegistered: false }),
      1200
    );
  }

  showAbortTextSection() {
    return () => {
      this.setState({ showStopTheTestSection: true });
      setTimeout(() => this.hideAbortTestSection(), 5000);
    };
  }

  hideAbortTestSection() {
    this.setState({ showStopTheTestSection: false });
  }

  abortTest() {
    this.stopSilentAudioClip();
    Sound.setActive(false);
    clearInterval(this.state.intervalId);
    this.props.actionStopTest();
    navigate('DefaultRoute');
  }

  nodeFinished() {
    const payload = {
      reactionTimeMs: this.state.reactionTimeMs,
      numberOfClicks: this.state.numberOfPresses,
      success: this.state.success,
    };
    if (this.state.success) {
      this.props.actionSuccess(payload);
    } else {
      this.props.actionFailure(payload);
    }
  }

  playAudioTest(node, sound) {
    // Setting master volume
    // Setting volume each time just to make sure the volume is not changed between plays
    // also, if headset was plugged in after componentDidMount() was called, we need to call this again
    // SystemSetting.setVolume(0.5, { showUI: true }); //Todo: Disabling this until we know how the calibration step should be done..

    // Setting playback volume
    sound.setVolume(node.stimulusMultiplicative);
    sound.setPan(node.panning);
    sound.play(successPlay => {
      if (!successPlay) {
        this.setState({ errorMessage: 'playback failed due to audio decoding errors' });
      }
      sound.release();
    });
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
    this.playSilentAudioClip();
    if (node && node.data && node.data.sound) {
      // Load the audio for current node
      // and wait with starting the node-timer until the sound is ready.
      const sound = new Sound(node.data.sound.url, null, error => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error('failed to load the sound', error);
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({
            errorMessage: null,
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
              this.nodeFinished();
            }
          }, intervalSpeed);
          this.setState({ intervalId });
        }
      });
    }
  }

  render() {
    const { showStopTheTestSection, pushRegistered } = this.state;
    const { actionStartTest, node, isFetching, testIsRunning, error } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {error && error.status && (
          <TouchableHighlight
            style={{ backgroundColor: STOP, padding: 12, margin: 0 }}
            onPress={() =>
              Linking.openURL(
                `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`
              )
            }
          >
            <>
              <Text style={{ color: 'white' }}>Could not fetch test due to</Text>
              <Text style={{ fontSize: 23, color: 'white', marginVertical: 4 }}>
                ERROR: {error.status} {error.message && `| ${error.message}`}
              </Text>
              <Text style={{ color: 'white' }}>Click to learn more...</Text>
            </>
          </TouchableHighlight>
        )}
        <SafeAreaView style={styles.component}>
          <View style={{ flex: 1 }}>
            {/* Stop The test section */}
            {showStopTheTestSection ? (
              <GestureRecognizer
                onSwipeUp={() => this.onSwipeUp()}
                style={{
                  backgroundColor: '#DEEDEE',
                  // flex: 0.8,
                  // justifyContent: 'space-between',
                  paddingHorizontal: '8%',
                  paddingVertical: 12,
                }}
              >
                <Text style={{ paddingVertical: 8 }}>
                  Hvis du trykker på Stopp, må du starte testen på nytt neste gang.
                </Text>
                <ButtonEDS onPress={() => this.abortTest()} text="Stopp testen" danger />
                <View
                  style={{
                    height: 8,
                    width: 60,
                    backgroundColor: '#C4C4C4',
                    alignSelf: 'center',
                    borderRadius: 4,
                  }}
                />
              </GestureRecognizer>
            ) : (
              <View style={{ flex: 1, padding: 24 }}>
                <ButtonEDS
                  small
                  outlined
                  onPress={this.showAbortTextSection()}
                  text="Jeg har behov for å stoppe testen"
                />
              </View>
            )}
          </View>
          <View style={{ justifyContent: 'center', padding: 12 }}>
            {/*  TextSection / Middle-section */}
            {!testIsRunning ? (
              <ButtonEDS
                loading={isFetching}
                onPress={() => actionStartTest()}
                text="Start testen"
              />
            ) : (
              <View style={{ flex: 1, padding: 12, justifyContent: 'center' }}>
                {pushRegistered && (
                  <Text style={{ color: 'red', textAlign: 'center', padding: 24 }}>
                    Ditt trykk har blitt registrert
                  </Text>
                )}
              </View>
            )}
            <View style={{ height: 100, padding: 10 }}>
              <Text style={{ color: 'red', textAlign: 'center', padding: 24 }}>
                {this.state.errorMessage ? `Error: ${this.state.errorMessage}` : ''}
              </Text>
              <Text style={{ textAlign: 'center', padding: 12 }}>
                Trykk på knappen nedenfor når du hører en lyd
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'center', padding: 12 }}>
            {/* Register when you hear a sound section */}
            <BigRoundButton
              disabled={isFetching || !testIsRunning}
              onPress={() => this.registerPress(node)}
              text="Jeg hører en lyd nå"
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actionFailure: reactionTimeMs => dispatch(failure(reactionTimeMs)),
  actionFetchTest: () => dispatch(fetchTest()),
  actionPostTest: test => dispatch(postTest(test)),
  actionStartTest: () => dispatch(startTest()),
  actionStopTest: () => dispatch(stopTest()),
  actionSuccess: reactionTimeMs => dispatch(success(reactionTimeMs)),
});

const mapStateToProps = state => ({
  error: selectError(state),
  isFetching: selectIsFetching(state),
  node: selectNode(state),
  test: selectTest(state),
  testIsFinished: selectTestIsFinished(state),
  testIsRunning: selectTestIsRunning(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage);
