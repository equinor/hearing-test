import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { cloneDeep } from 'lodash';
import { defaultNavOptions } from '../navigation';
import manWithHeadset from '../assets/man-headset.png';
import manIsOK from '../assets/man-ok.png';
import manInEnvironment from '../assets/man-environment.png';
import audioWaveWithDots from '../assets/audiowave-dots.png';
import manIsSick from '../assets/man-temperature.png';
import ButtonEDS from '../components/common/EDS/Button';
import Indicators from '../components/common/molecules/Indicators';
import { navigate } from '../navigation/service';

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

export default class PreTestPage extends Component {
  static navigationOptions = () => ({
    ...defaultNavOptions,
    headerRight: null,
    headerLeft: null,
  });

  state = {
    pages: [
      {
        title: 'Før testen',
        content: '- Du må ta hørselstesten hver 6. måned\n- Testen tar ca. 15 minutter',
        current: true,
        done: false,
        image: manWithHeadset,
        buttons: [{ text: 'Start', onPress: () => this.nextPage() }],
      },
      {
        title: 'Er du forkjølet?',
        content:
          'For at resultatene skal være pålitelige, kan du ikke ta testen om du er forkjølet',
        current: false,
        done: false,
        image: manIsOK,
        buttons: [
          { text: 'Jeg er klar for testen', onPress: () => this.nextPage() },
          {
            text: 'Jeg er forkjølet',
            onPress: () =>
              this.showCustomPage({
                title: 'Er du ikke helt i form?',
                content: 'Du vil motta en ny invitasjon om en uke',
                current: true,
                done: true,
                image: manIsSick,
                buttons: [{ text: 'Tilbake til menyen', onPress: () => navigate('DefaultRoute') }],
              }),
          },
        ],
      },
      {
        title: 'Forberedelse',
        content:
          'Til hørselstesten trenger du følgende:\n\n- Et stille rom uten andre mennesker (lugar anbefalt)\n- Et godkjent headset (kontakt HMS-leder for informasjon om hvor dette er tilgjengelig)',
        current: false,
        done: false,
        image: manInEnvironment,
        buttons: [{ text: 'Se hvordan testen fungerer', onPress: () => this.nextPage() }],
      },
      {
        title: 'Hvordan hørselstesten fungerer',
        content:
          '- Appen vil foreta 3 måleserier. Du vil ha mulighet til å stoppe mellom hver av dem.\n- Hver gang du hører en lyd, klikk på "Jeg hører en lyd nå"-knappen\n- Når testen er ferdig utført vil du se resultatet på skjermen din',
        current: false,
        done: false,
        image: audioWaveWithDots,
        buttons: [{ text: 'Start hørselstest', onPress: () => this.nextPage() }],
      },
    ],
  };

  showCustomPage(customPage) {
    const currentIndex = this.state.pages.findIndex(page => page.current);
    const clonedPages = cloneDeep(this.state.pages);
    clonedPages[currentIndex] = customPage;
    this.setState({ pages: clonedPages });
  }

  currentPage() {
    return this.state.pages.find(page => page.current);
  }

  nextPage() {
    const currentIndex = this.state.pages.findIndex(page => page.current);
    const clonedPages = cloneDeep(this.state.pages);
    clonedPages[currentIndex].done = true;
    if (currentIndex + 1 < this.state.pages.length) {
      clonedPages[currentIndex].current = false;
      clonedPages[currentIndex + 1].current = true;
      this.setState({ pages: clonedPages });
    } else {
      navigate('SoundCheckRoute');
    }
  }

  render() {
    const view = this.currentPage();
    return (
      <View style={styles.component}>
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Image source={view.image} style={{ height: 250, resizeMode: 'contain' }} />
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
              {view.title}
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
              {view.content}
            </Text>
          </View>
          {view.buttons.map(({ onPress, text }) => {
            return <ButtonEDS text={text} onPress={onPress} key={text} />;
          })}
        </ScrollView>
        <View style={{ height: 80, justifyContent: 'center' }}>
          <Indicators iterable={this.state.pages} />
        </View>
      </View>
    );
  }
}
