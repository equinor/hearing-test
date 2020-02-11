import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default class ButtonEDS extends Component<{
  onPress: () => void,
  text: string,
  outlined: boolean,
  small: boolean,
  danger: boolean,
}> {
  render() {
    if (this.props.danger) {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View
            style={{
              height: 62,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              marginBottom: 23,
              width: this.props.small ? '50%' : '100%',
              backgroundColor: this.props.outlined ? '#DEEDEE' : '#EB0000',
            }}
          >
            <Text
              style={{
                color: this.props.outlined ? '#007079' : 'white',
                fontSize: 17,
                textAlign: 'center',
              }}
            >
              {this.props.text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            height: 62,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            marginBottom: 23,
            borderWidth: 1,
            width: this.props.small ? '50%' : '100%',
            backgroundColor: this.props.outlined ? '#DEEDEE' : '#007079',
            borderColor: '#007079',
          }}
        >
          <Text
            style={{
              color: this.props.outlined ? '#007079' : 'white',
              fontSize: 17,
              textAlign: 'center',
            }}
          >
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
