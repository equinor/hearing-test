import React, { Component } from 'react';
import { Image, View } from 'react-native';
import indicatorDone from '../../../assets/indicator-done.png';
import indicatorCurrent from '../../../assets/indicator-current.png';
import indicatorTodo from '../../../assets/indicator-todo.png';

export default class Indicators extends Component<{ iterable: [] }> {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {this.props.iterable.map(({ current, done }) => {
          const diameter = 16;
          const style = { width: diameter, height: diameter };
          if (done) {
            return <Image source={indicatorDone} resizeMode="contain" style={style} />;
          }
          if (current) {
            return <Image source={indicatorCurrent} resizeMode="contain" style={style} />;
          }
          return <Image source={indicatorTodo} resizeMode="contain" style={style} />;
        })}
      </View>
    );
  }
}
