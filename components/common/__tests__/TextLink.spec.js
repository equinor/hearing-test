import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TextLink from '../atoms/TextLink';

it('renders and behaves correctly', () => {
  let returnedRoute;
  const nav = {
    navigate: sinon.spy(route => {
      returnedRoute = route;
    }),
  };
  const wrapper = shallow(<TextLink data={{ name: 'test', route: 'testRoute' }} nav={nav} />);
  const TextLinkControl = wrapper.find('TouchableOpacity');
  expect(wrapper).toMatchSnapshot();
  expect(nav.navigate.calledOnce).toBeFalsy();
  TextLinkControl.simulate('press');
  expect(nav.navigate.calledOnce).toBeTruthy();
  expect(returnedRoute).toBe('testRoute');
});
