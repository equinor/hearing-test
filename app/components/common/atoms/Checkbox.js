import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = {
  defaultButtonStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
};

export default class Checkbox extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.number,
    color: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    style: {},
    size: 24,
    color: '#0185B7',
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.defaultButtonStyle, this.props.style]}
        onPress={() => {
          this.props.onValueChange(this.props.disabled ? this.props.checked : !this.props.checked);
        }}
        disabled={this.props.disabled}
      >
        <Icon
          name={this.props.checked ? 'check-box' : 'check-box-outline-blank'}
          size={this.props.size}
          color={this.props.color}
        />
      </TouchableOpacity>
    );
  }
}
