import reducer from './reducer';
import * as actions from './actions';
import { stateKeys } from '../../types';

const defaultState = {
  content: {
    message: '',
  },
  fetching: false,
};

let state = {
  [stateKeys.SERVICEMESSAGE]: {},
};

describe('Test ServiceMessage actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.SERVICEMESSAGE]: { ...defaultState } };
  });

  it('should have the correct default state', () => {
    expect(state).toEqual({
      [stateKeys.SERVICEMESSAGE]: {
        content: {
          message: '',
        },
        fetching: false,
      },
    });
  });
});
