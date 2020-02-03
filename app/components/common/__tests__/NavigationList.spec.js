import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import NavigationList from '../molecules/NavigationList';

it('renders and behaves correctly', () => {
  let navInfo;

  const items = [
    {
      key: 'item1Key',
      label: 'item1Label',
      route: 'item1Route',
    },
    {
      key: 'item2Key',
      label: 'item2Label',
      route: 'item2Route',
      params: { id: 2 },
    },
  ];
  const nav = {
    navigate: sinon.spy((route, params) => {
      navInfo = { route, params };
    }),
  };

  const onRefresh = sinon.spy();

  const wrapper = shallow(<NavigationList items={items} navigation={nav} onRefresh={onRefresh} />);
  const instance = wrapper.instance();
  expect(wrapper).toMatchSnapshot();
  expect(nav.navigate.calledOnce).toBeFalsy();
  instance.handleClick(0);
  expect(nav.navigate.calledOnce).toBeTruthy();
  expect(navInfo.route).toBe('item1Route');
  expect(navInfo.params).toBeUndefined();
  instance.handleClick(1);
  expect(nav.navigate.calledTwice).toBeTruthy();
  expect(navInfo.route).toBe('item2Route');
  expect(navInfo.params).toEqual({ id: 2 });
});
