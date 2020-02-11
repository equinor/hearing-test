import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class BigRoundButton extends Component<{
  onPress: () => void,
  text: string,
  disabled: boolean,
}> {
  render() {
    const diameter = 200;
    const { disabled, text, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          height: diameter,
          width: diameter,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: diameter / 2,
          backgroundColor: disabled ? '#F5F5F5' : '#007079',
        }}
      >
        <Text style={{ color: disabled ? '#666666' : 'white', fontSize: 17 }}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
