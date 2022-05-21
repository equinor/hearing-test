import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as colors from '../../../../constants/colors';

const MadButton = (props: { onPress: any, text: string, active: boolean, testID: string }) => (
  <TouchableOpacity
    testID={props.testID}
    disabled={!props.active}
    onPress={props.onPress}
    style={{
      backgroundColor: props.active ? colors.MOSS_GREEN_100 : '#EAEAEA',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      height: 48,
      padding: 6,
      borderWidth: 1,
      borderColor: props.active ? colors.MOSS_GREEN_100 : 'gray',
    }}
  >
    <Text
      style={{
        color: props.active ? '#FFFFFF' : '#6F6F6F',
        fontWeight: '500',
        fontSize: 16,
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
);

export default MadButton;
