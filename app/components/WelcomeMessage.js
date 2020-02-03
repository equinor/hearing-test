import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from '../stylesheets/colors';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeMessage: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 120,
  },
  welcomeTitle: {
    fontSize: 28,
    color: colors.PINK,
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.GRAY_2,
    textAlign: 'center',
  },
});

const WelcomeMessage = () => (
  <View style={styles.component}>
    <View style={{ flexDirection: 'row' }}>
      <Icon name="md-happy" color={colors.BLACK_LIGHT} size={34} />
      <Text style={styles.welcomeTitle}>Congratulations!</Text>
    </View>
    <View style={styles.welcomeMessage}>
      <Text style={styles.welcomeText}>
        You have just created a fully functional, cross-platform, native mobile app by practically
        doing nothing...awesome!
      </Text>
    </View>
  </View>
);

export default WelcomeMessage;
