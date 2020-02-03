import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

const styles = {
  defaultTextStyle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 16,
  },
  defaultButtonStyle: {
    flexDirection: 'row',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
};

const Button = ({ title, onPress, textStyle, viewStyle, disabled, busy }) => {
  const { defaultButtonStyle, defaultTextStyle } = styles;

  const titleComponent =
    typeof title === 'string' ? <Text style={[defaultTextStyle, textStyle]}>{title}</Text> : title;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[defaultButtonStyle, viewStyle, disabled && { opacity: 0.5 }]}>
        {busy && <ActivityIndicator size="small" style={{ marginRight: 4 }} />}
        {titleComponent}
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  textStyle: Text.propTypes.style,
  viewStyle: Text.propTypes.style,
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
};

Button.defaultProps = {
  textStyle: {},
  viewStyle: {},
  disabled: false,
  busy: false,
};

export default Button;
