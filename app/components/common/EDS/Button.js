import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default class ButtonEDS extends Component<{ onPress: () => void, text: string }> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            height: 62,
            backgroundColor: '#007079',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            marginBottom: 23,
          }}
        >
          <Text style={{ color: 'white', fontSize: 17 }}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
