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
    title: 'SoundCheckPage',
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
    // Load the sound file 'testBell.wav' from the app bundle
    this.sound = new Sound('1000Hz_dobbel.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });
  }

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  sound: Sound;

  playAudioTest() {
    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
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
              Plugg i headsettet og spill av test-lyden.
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
                    {`- Sjekk at telefonen ikke er i stille modus.\n- Trekk ut hodesettet og hør om musikken spilles gjennom høytalerne til telefonen.`}
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
