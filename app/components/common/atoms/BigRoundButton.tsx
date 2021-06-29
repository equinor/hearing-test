import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BigRoundButton = (props: { onPress: () => void; text: string; disabled: boolean }) => {
  const diameter = 241;
  const { disabled, text, onPress } = props;
  return (
    <TouchableOpacity
      testID="BigRoundButton"
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
};

export default BigRoundButton;
