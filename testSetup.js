/* eslint-disable */

import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Mocks
jest.mock('react-native-cookies', () => ({
  clearAll: jest.fn(),
  clearByName: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  getFromResponse: jest.fn(),
  set: jest.fn(),
  setFromResponse: jest.fn(),
}));
