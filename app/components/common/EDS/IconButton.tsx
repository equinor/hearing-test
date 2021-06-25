import React, { useState } from 'react';

import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { EQUINOR_GREEN } from '../../../stylesheets/colors';

const IconButton = (props: { icon: string; onPress?: Function }) => {
  const [activeTouch, setActiveTouch] = useState(false);

  return (
    <View
      style={{
        borderRadius: 180,
        aspectRatio: 1,
        height: 48,
        width: 48,
        backgroundColor: activeTouch ? '#DEEDEE' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => setActiveTouch(true)}
        onPressOut={() => setActiveTouch(false)}
        onPress={() => {
          props.onPress();
        }}
      >
        <Icon name={props.icon} size={24} color={EQUINOR_GREEN} />
      </TouchableOpacity>
    </View>
  );
};
IconButton.defaultProps = {
  onPress: () => {
    return null;
  },
};

export default IconButton;
