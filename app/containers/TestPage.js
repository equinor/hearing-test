import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
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
  selectNode,
  selectTest,
  selectTestIsFinished,
  selectTestIsRunning,
} from '../store/test/reducer';
import { failure, fetchTest, startTest, stopTest, success } from '../store/test/actions';
import { selectIsFetching } from '../store/test';

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
    actionStartTest: PropTypes.func.isRequired,
    actionStopTest: PropTypes.func.isRequired,
    actionSuccess: PropTypes.func.isRequired,
    // Selectors
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
      if (this.props.testIsFinished) navigate('TestResultRoute');
    }
  }

  onSwipeUp() {
    this.hideAbortTestSection();
  }

  clickRegisteredTimeoutId: number;

  registerPress(node) {
    this.showClickFeedbackMessage();
    if (!!node && !!node.data) {
      const reactionTimeMs = this.state.timer - node.data.preDelayMs;
      // We register a press if it was done in the postDelay window
      if (
        this.state.timer > node.data.preDelayMs &&
        this.state.timer < node.data.preDelayMs + node.data.postDelayMs
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

  runNode(node) {
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
            timer: 0,
            success: false,
            soundHasBeenPlayed: false,
            reactionTimeMs: null,
            numberOfPresses: 0,
          });

          // Todo: We could refactor this to not use this.state...
          //    Might give some performance gains?
          //    But for debugging reasons, it's nice to display that data in the view, so until then, leave it

          const startTime = new Date();
          const intervalSpeed = 1;

          const intervalId = setInterval(() => {
            const { soundHasBeenPlayed, timer } = this.state;
            const { postDelayMs, preDelayMs } = node.data;

            if (timer < preDelayMs) {
              this.setState({ nodeState: 'preDelay' });
            }
            if (timer > preDelayMs) {
              this.setState({ nodeState: 'postDelay' });
              if (!soundHasBeenPlayed) {
                this.playAudioTest(node.data, sound);
                this.setState({ soundHasBeenPlayed: true });
              }
            }
            if (timer < preDelayMs + postDelayMs) {
              this.setState({
                timer: new Date() - startTime,
              });
            } else {
              this.setState({ nodeState: 'Finished' });
              clearInterval(intervalId);
              this.nodeFinished();
            }
          }, intervalSpeed);
          this.setState({ intervalId });
        }
      });
    }
  }

  // Practical debugging window when fixing test. Todo: Remove when we don't need it anymore
  devInfo = (showDevInfo, test, node) => (
    <>
      {showDevInfo && (
        <View
          style={{
            padding: 12,
            borderColor: '#C4C4C4',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 18 }}>Dev-info section.</Text>
          <Text>{JSON.stringify(node)}</Text>
          <Text>Node Time: {this.state.timer}</Text>
          {node && (
            <View style={{ alignItems: 'center', flex: 1, padding: 12, flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: this.state.nodeState === 'preDelay' ? '#DEEDEE' : '#F7F7F7',
                  fontWeight: 'bold',
                  flex: 1,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#C4C4C4',
                  borderWidth: 1,
                }}
              >
                <Text>preDelay</Text>
                <Text>{node.data && node.data.preDelayMs}</Text>
              </View>
              <View
                style={{
                  backgroundColor: this.state.nodeState === 'postDelay' ? '#DEEDEE' : '#F7F7F7',
                  fontWeight: 'bold',
                  flex: 1,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#C4C4C4',
                  borderWidth: 1,
                }}
              >
                <Text>postDelay</Text>
                <Text>{node.data && node.data.postDelayMs}</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );

  render() {
    // /////////////////////// //
    const showDevInfo = false; // <- Practical debugging window when fixing test. Todo: Remove when we don't need it anymore
    // /////////////////////// //

    const { showStopTheTestSection, pushRegistered } = this.state;
    const { actionStartTest, test, node, isFetching, testIsRunning } = this.props;
    return (
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
            <ButtonEDS loading={isFetching} onPress={() => actionStartTest()} text="Start testen" />
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
        {this.devInfo(showDevInfo, test, node)}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actionFetchTest: () => dispatch(fetchTest()),
  actionStartTest: () => dispatch(startTest()),
  actionStopTest: () => dispatch(stopTest()),
  actionSuccess: reactionTimeMs => dispatch(success(reactionTimeMs)),
  actionFailure: reactionTimeMs => dispatch(failure(reactionTimeMs)),
});

const mapStateToProps = state => ({
  isFetching: selectIsFetching(state),
  testIsRunning: selectTestIsRunning(state),
  testIsFinished: selectTestIsFinished(state),
  node: selectNode(state),
  test: selectTest(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage);
