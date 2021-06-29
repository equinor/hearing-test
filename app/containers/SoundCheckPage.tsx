import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import SystemSetting from 'react-native-system-setting';
import { defaultNavOptions } from '../navigation';
import ButtonEDS from '../components/common/EDS/Button';
import Typography from '../components/common/atoms/Typography';
import IconButton from '../components/common/EDS/IconButton';
import { EQUINOR_GREEN, GRAY_BACKGROUND } from '../stylesheets/colors';
import BigRoundButton from '../components/common/atoms/BigRoundButton';
import { SoundCheckPageJSON } from '../types';
import { navigate } from '../navigation/service';

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
    padding: 16,
    paddingBottom: 60,
  },
});

const SoundCheckPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sound, setSound] = useState<Sound>(null);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, { toValue: 1, duration: 500, useNativeDriver: false }).start();
  }, [opacityAnim]);

  useEffect(() => {
    setSound(
      new Sound('1000Hz_dobbel.wav', Sound.MAIN_BUNDLE, error => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log('failed to load the sound', error);
        }
      })
    );

    // change the volume
    Sound.setCategory('Playback');
    Sound.setMode('Measurement');
    Sound.setActive(true);

    // Load the sound file 'testBell.wav' from the app bundle
    SystemSetting.setVolume(0.5, { showUI: true });
  }, []);

  function nextPage() {
    if (currentPage + 1 === 3) navigate('TestRoute');
    else {
      // Animated.timing(opacityAnim, { toValue: 0, duration: 500, useNativeDriver: false }).start();
      setCurrentPage(currentPage + 1);
    }
  }
  const pages: SoundCheckPageJSON[] = [
    {
      title: 'Lydsjekk',
      description:
        'Før vi startet testen tar vi en prøverunde. Lydsjekken tar for seg et øre om gangen.',
      button: (
        <BigRoundButton variant="secondary" text="Trykk her for å starte" onPress={nextPage} />
      ),
      hearNoSoundButtonVisible: false,
      sound: {
        play: false,
      },
    },
    {
      title: 'Venstre øre',
      description: 'Trykk på sirkelen under når du hører en lyd',
      button: <CanHearSoundButton key="left" onPress={() => setTimeout(nextPage, 500)} />,
      hearNoSoundButtonVisible: true,
      sound: {
        play: true,
        ear: 'left',
      },
    },
    {
      title: 'Høyre øre',
      description: 'Trykk på sirkelen under når du hører en lyd',
      button: <CanHearSoundButton key="right" onPress={() => setTimeout(nextPage, 500)} />,
      hearNoSoundButtonVisible: true,
      sound: {
        play: true,
        ear: 'right',
      },
    },
  ];

  function playAudioTest(ear: 'left' | 'right') {
    // Setting volume each time just to make sure the volume is not changed between plays
    // also, if headset was plugged in after componentDidMount() was called, we need to call this again
    // SystemSetting.setVolume(0.5, { showUI: true }); //Todo: Disabling this until we know how the calibration step should be done..
    sound.setVolume(1);
    if (ear === 'left') sound.setPan(-1);
    if (ear === 'right') sound.setPan(1);
    sound.play(success => {
      if (success) {
        // eslint-disable-next-line no-console
        console.log('successfully finished playing');
      } else {
        // eslint-disable-next-line no-console
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
  const page = pages[currentPage];
  useEffect(() => {
    if (sound) {
      sound.stop();
      if (page.sound.play && !modalVisible) {
        setTimeout(() => playAudioTest(page.sound.ear), 1000);
      }
    }
  }, [currentPage, modalVisible]);
  return (
    <Animated.View
      style={{ height: '100%', backgroundColor: GRAY_BACKGROUND, opacity: opacityAnim }}
      key={currentPage}
    >
      <SoundCheckTimeBar
        duration={1000 + (sound ? sound.getDuration() * 1000 : 0)}
        disabled={currentPage === 0}
        key={currentPage}
      />

      <View style={styles.component}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <View style={{ width: 48, height: 48 }} />
          <Typography variant="h1">{page.title}</Typography>
          <IconButton
            icon="close"
            onPress={() => {
              Alert.alert('Avslutte lydsjekk?', 'Da må du begynne på nytt neste gang', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'default',
                },
                {
                  text: 'Avslutt',
                  onPress: () => navigate('DefaultRoute'),
                  style: 'destructive',
                },
              ]);
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Typography variant="p" style={{ height: 18 * 3 }}>
            {page.description}
          </Typography>
          {page.button}
          {page.hearNoSoundButtonVisible ? (
            <ButtonEDS text="hører ingen lyd" onPress={() => setModalVisible(true)} />
          ) : (
            <View style={{ height: 58 }} />
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          style={{ display: 'flex' }}
        >
          <SafeAreaView style={{ display: 'flex' }}>
            <View
              style={{
                backgroundColor: GRAY_BACKGROUND,
                borderRadius: 4,
                padding: 16,
                paddingBottom: 60,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // flex: 1,
                height: '100%',
              }}
            >
              <View />
              <View>
                <Typography variant="h2" style={{ textAlign: 'center' }}>
                  Hvis du ikke hører lyden
                </Typography>
                <Typography variant="p" style={{ textAlign: 'center' }}>
                  Sjekk at telefonen ikke er i stillemodus. Trekk ut headsettet og hør om lyden
                  spilles gjennom høyttalerne til telefonen.
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
  );
  /* return (
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
            </View>
          </Modal>
        </ScrollView>
      </View>
    ); */
};

const CanHearSoundButton = (props: { onPress: CallableFunction }) => {
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

const SoundCheckTimeBar = (props: { duration: number; disabled?: boolean }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!props.disabled)
      Animated.timing(progressAnim, {
        toValue: 100,
        duration: props.duration,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
  }, [progressAnim]);
  console.log(props.duration);
  console.log();
  if (props.disabled) return <View style={{ height: 4 }} />;

  return (
    <View
      style={{
        height: 4,
        width: '100%',
        backgroundColor: '#DCDCDC',
      }}
    >
      <Animated.View
        style={{
          height: '100%',
          backgroundColor: EQUINOR_GREEN,
          width: progressAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
        }}
      />
    </View>
  );
};

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
