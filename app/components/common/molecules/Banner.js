import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import * as Colors from '../../../stylesheets/colors';

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: Colors.PURPLE_LIGHT,
  },
  bannerText: {
    fontSize: 14,
  },
});

const Banner = ({ text, viewStyle, textStyle }) => (
  <View style={[styles.bannerContainer, viewStyle]}>
    <Text style={[styles.bannerText, textStyle]}>{text}</Text>
  </View>
);

Banner.propTypes = {
  text: PropTypes.string,
  viewStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

Banner.defaultProps = {
  text: '',
  viewStyle: {},
  textStyle: {},
};

export default Banner;
