import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Spinner from '../atoms/Spinner';
import Typography from '../atoms/Typography';

export default class ButtonEDS extends Component<{
  onPress: () => void,
  text: string,
  outlined: boolean,
  small: boolean,
  danger: boolean,
  loading: boolean,
  disabled: boolean,
}> {
  getBackgroundColor(props) {
    if (props.disabled || props.loading || props.outlined) return `#EAEAEA`;
    if (props.danger) return '#EB0000';
    return '#007079';
  }

  render() {
    const { danger, disabled, loading, onPress, outlined, small, text } = this.props;
    return (
      <TouchableOpacity onPress={onPress} disabled={loading || disabled}>
        <View
          style={{
            height: 40,
            width:160,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            marginBottom: 18,
            borderWidth: !danger && 1,
            //width: small ? '50%' : '100%',
            backgroundColor: this.getBackgroundColor(this.props),
            borderColor: disabled || loading ? `#DCDCDC` : '#007079',
          }}
        >
          {loading ? (
            <Spinner color="#6F6F6F" />
          ) : (
            <Typography variant="button"
              color={outlined ? '#007079' : 'white'}
              style={{
                textAlign: 'center',
              }}
            >
              {text}
            
            </Typography>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
