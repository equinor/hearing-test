import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { defaultNavOptions } from '../navigation';
import * as colors from '../stylesheets/colors';
import { navigate } from '../navigation/service';
import ButtonEDS from '../components/common/EDS/Button';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
});

export default class DefaultPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...defaultNavOptions,
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
        <Text
          style={{
            color: '#243746',
            fontSize: 15,
            paddingTop: 65,
            paddingBottom: 65,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Velkommen til din hørselsmonitorering
        </Text>
        <ButtonEDS onPress={() => navigate('PreTestRoute')} text="Ta hørselstesten" />
      </View>
    );
  }
}
