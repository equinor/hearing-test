import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Button from '../atoms/Button';

it('renders and behaves correctly', () => {
  const onButtonPress = sinon.spy();
  const wrapper = shallow(<Button title="Foo" onPress={onButtonPress} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('ActivityIndicator')).toHaveLength(0);
  expect(onButtonPress.calledOnce).toBeFalsy();
  wrapper.setProps({ busy: true });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('ActivityIndicator')).toHaveLength(1);
  wrapper.find('TouchableOpacity').simulate('press');
  expect(onButtonPress.calledOnce).toBeTruthy();
});
