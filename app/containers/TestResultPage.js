import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { defaultNavOptions } from '../navigation';
import ButtonEDS from '../components/common/EDS/Button';
import { navigate } from '../navigation/service';
import allGood from '../assets/allGood.png';
import { selectResults } from '../store/test/reducer';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
});

class TestResultPage extends Component {
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
    results: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  render() {
    const { results } = this.props;
    return (
      <View style={styles.component}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            marginTop: 26,
            justifyContent: 'center',
          }}
        >
          {/*  Results-header section */}
          <Text>Testen er nå fullført</Text>
          <Image source={allGood} style={{ height: 50, width: 50, margin: 26 }} />
          {results.map(result => {
            const { panning, sound, index, stimulusDb } = result.data;
            return (
              <Text key={index}>
                {`HZ: ${sound.hz}, Panning: ${panning}, Stimulus DB: ${stimulusDb}`}
              </Text>
            );
          })}
        </View>
        <View style={{ flex: 1, marginBottom: 40, justifyContent: 'flex-end' }}>
          {/*  Buttons-section */}
          <ButtonEDS
            onPress={() => navigate('DefaultRoute')}
            text="Tilbake til menyen"
            outlined={false}
            small={false}
            danger={false}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  results: selectResults(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestResultPage);
