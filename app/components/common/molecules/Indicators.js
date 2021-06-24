import React, { Component } from 'react';
import { Image, View } from 'react-native';
import indicatorDone from '../../../assets/indicator-done.png';
import indicatorCurrent from '../../../assets/indicator-current.png';
import indicatorTodo from '../../../assets/indicator-todo.png';
import { EQUINOR_GREEN } from '../../../stylesheets/colors';

export default class Indicators extends Component<{ iterable: [] }> {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems:'center'
        }}
      >
        {this.props.iterable.map(({ current, done }) => {
          const diameter = 16;
          const style = { width: diameter, height: diameter };
          if (current) {
            return <View style={{borderRadius:16, width:20, height:10, backgroundColor: EQUINOR_GREEN, margin:2}}/>;
          }
          return <View style={{borderRadius:16, width:12, height:8, backgroundColor: '#97CACE', margin:2}}/>;
        })}
      </View>
    );
  }
}
