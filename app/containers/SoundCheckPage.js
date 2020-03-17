import React, { Component } from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import SystemSetting from 'react-native-system-setting';
import { defaultNavOptions } from '../navigation';
import manWithHeadset from '../assets/man-headset.png';
import audioTroubles from '../assets/audio-trouble.png';
import { navigate } from '../navigation/service';
import ButtonEDS from '../components/common/EDS/Button';

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

class SoundCheckPage extends Component {
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

  constructor() {
    super();
    // Setup the playback
    Sound.setCategory('Playback');
    Sound.setMode('Measurement');
    Sound.setActive(true);

    // Load the sound file 'testBell.wav' from the app bundle
    this.sound = new Sound('1000Hz_dobbel.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('failed to load the sound', error);
      }
    });
  }

  state = {
    modalVisible: false,
  };

  componentDidMount(): void {
    // change the volume
    SystemSetting.setVolume(0.5, { showUI: true });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  sound: Sound;

  playAudioTest() {
    // Setting volume each time just to make sure the volume is not changed between plays
    // also, if headset was plugged in after componentDidMount() was called, we need to call this again
    // SystemSetting.setVolume(0.5, { showUI: true }); //Todo: Disabling this until we know how the calibration step should be done..
    this.sound.setVolume(1);
    this.sound.play(success => {
      if (success) {
        // eslint-disable-next-line no-console
        console.log('successfully finished playing');
      } else {
        // eslint-disable-next-line no-console
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

  render() {
    return (
      <View style={styles.component}>
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Image source={manWithHeadset} style={{ height: 250, resizeMode: 'contain' }} />
          </View>
          <View>
            <Text
              style={{
                color: '#243746',
                fontSize: 15,
                paddingTop: 16,
                paddingBottom: 16,
                fontWeight: 'bold',
              }}
            >
              Lydsjekk
            </Text>
            <Text
              style={{
                color: '#243746',
                fontSize: 16,
                lineHeight: 24,
                paddingBottom: 32,
                fontWeight: 'normal',
              }}
            >
              {`1. Sett mobilen din på lydløs. (switch-en på venstre side av din iPhone)\n2. Plugg i headsettet\n3. Spill av test-lyden.`}
            </Text>
          </View>
          <ButtonEDS onPress={() => this.playAudioTest()} text="Spill av test-lyd" />
          <Text
            style={{
              color: '#243746',
              fontSize: 16,
              lineHeight: 24,
              paddingBottom: 32,
              fontWeight: 'normal',
            }}
          >
            Kunne du høre noen lyd?
          </Text>
          <ButtonEDS onPress={() => navigate('TestRoute')} text="Ja" />
          <ButtonEDS onPress={() => this.setModalVisible(true)} text="Nei" />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={{ flex: 1, padding: 22, backgroundColor: '#d7edee' }}>
              {/* <ScrollView> */}
              <SafeAreaView>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 4,
                    padding: 12,
                    marginTop: 40,
                    marginBottom: 20,
                  }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <Image source={audioTroubles} style={{ height: 250, resizeMode: 'contain' }} />
                  </View>
                  <Text
                    style={{
                      color: '#243746',
                      fontSize: 15,
                      paddingTop: 16,
                      paddingBottom: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    Hvis du ikke hører lyden
                  </Text>
                  <Text
                    style={{
                      color: '#243746',
                      fontSize: 16,
                      lineHeight: 24,
                      paddingBottom: 32,
                      fontWeight: 'normal',
                    }}
                  >
                    - Trekk ut hodesettet og hør om musikken spilles gjennom høytalerne til
                    telefonen.
                  </Text>
                </View>
                <ButtonEDS onPress={() => this.setModalVisible(false)} text="OK" />
              </SafeAreaView>
              {/* </ScrollView> */}
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = () => ({
  // TODO
});

const mapStateToProps = () => ({
  // TODO
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundCheckPage);
