import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { defaultNavOptions } from '../navigation';
import * as colors from '../stylesheets/colors';
import WelcomeMessage from '../components/WelcomeMessage';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default class DefaultPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...defaultNavOptions,
    title: 'Hearing Test',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsRoute')}
        style={{ paddingLeft: 15, paddingRight: 15 }}
      >
        <Icon name="md-more" color={colors.RED_LOGO} size={24} />
      </TouchableOpacity>
    ),
    headerLeft: null,
  });

  render() {
    return (
      <View style={styles.component}>
        <WelcomeMessage />
      </View>
    );
  }
}
