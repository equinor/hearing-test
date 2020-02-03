import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Checkbox from '../atoms/Checkbox';

it('renders and behaves correctly', () => {
  let checked = false;
  const callback = value => {
    checked = value;
  };
  const onCheckboxPress = sinon.spy(callback);
  const wrapper = shallow(<Checkbox onValueChange={onCheckboxPress} />);
  const checkboxControl = wrapper.find('TouchableOpacity');
  expect(wrapper).toMatchSnapshot();
  expect(onCheckboxPress.calledOnce).toBeFalsy();
  checkboxControl.simulate('press');
  expect(onCheckboxPress.calledOnce).toBeTruthy();
  expect(checked).toBe(true);
  wrapper.setProps({ checked: false, disabled: true });
  checkboxControl.simulate('press');
  expect(checked).toBe(false);
});
