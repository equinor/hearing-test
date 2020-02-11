import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import GestureRecognizer from 'react-native-swipe-gestures';
import { defaultNavOptions } from '../navigation';
import ButtonEDS from '../components/common/EDS/Button';
import BigRoundButton from '../components/common/atoms/BigRoundButton';
import { navigate } from '../navigation/service';

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
    title: 'TestPage',
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
    // TODO
  };

  static defaultProps = {
    // TODO
  };

  constructor() {
    super();
    // Load the sound file 'testBell.wav' from the app bundle
    this.sound = new Sound('test.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });
  }

  state = {
    showStartTestButton: true,
    pushRegistered: false,
    showStopTheTestSection: false,
    counter: 0,
    testDuration: 0,
    elapsedTime: 0,
  };

  onSwipeUp() {
    this.hideAbortTestSection();
  }

  startTheTest() {
    const testDuration = this.sound.getDuration();
    this.setState({ testDuration });
    this.setState({ showStartTestButton: false });
    setTimeout(() => {
      this.sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
          setTimeout(() => navigate('DefaultRoute'), 3000);
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
      setInterval(() => {
        if (this.state.elapsedTime < testDuration) {
          this.setState({ elapsedTime: this.state.elapsedTime + 0.1 });
        }
      }, 100);
    }, 2000);
  }

  registerPress() {
    this.setState({ pushRegistered: true });
    setTimeout(() => {
      this.setState({ pushRegistered: false, counter: this.state.counter + 1 });
      if (this.state.counter > 4) {
        navigate('SoundCheckRoute');
      }
    }, 1500);
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
    this.sound.stop();
    navigate('DefaultRoute');
  }

  render() {
    const { showStopTheTestSection, pushRegistered, showStartTestButton } = this.state;
    return (
      <View style={styles.component}>
        <View style={{ flex: 1 }}>
          {/* Stop The test section */}
          {showStopTheTestSection ? (
            <GestureRecognizer
              onSwipeUp={() => this.onSwipeUp()}
              style={{
                backgroundColor: '#DEEDEE',
                flex: 0.8,
                justifyContent: 'space-between',
                padding: '10%',
              }}
            >
              <Text>Hvis du trykker på Stopp, må du starte testen på nytt neste gang.</Text>
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
        <View style={{ flex: 1, justifyContent: 'center', padding: 12 }}>
          {showStartTestButton && (
            <ButtonEDS onPress={() => this.startTheTest()} text="Start testen" />
          )}
          <View style={{ height: 100, padding: 10 }}>
            {/*  TextSection */}
            <Text style={{ textAlign: 'center', padding: 12 }}>
              Trykk på knappen nedenfor når du hører en lyd
            </Text>
            {pushRegistered && (
              <Text style={{ color: 'red', textAlign: 'center', padding: 24 }}>
                Ditt trykk har blitt registrert
              </Text>
            )}
          </View>
        </View>
        <View style={{ alignItems: 'center', flex: 1, padding: 12 }}>
          {/* Register when you hear a sound section */}
          <BigRoundButton
            disabled={showStartTestButton}
            onPress={() => this.registerPress()}
            text="Jeg hører en lyd nå"
          />
          <Text>
            {`${this.state.elapsedTime.toFixed(1)}/${this.state.testDuration.toFixed(1)}`}
          </Text>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // TODO
});

const mapStateToProps = state => ({
  // TODO
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage);
