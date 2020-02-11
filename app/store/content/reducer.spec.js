import reducer from './reducer';
import * as actions from './actions';
import { stateKeys } from '../../types';

const defaultState = {
  content: {
    // message: '',
  },
  fetching: false,
};

let state = {
  [stateKeys.CONTENT]: {},
};

describe('Test Content actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.CONTENT]: { ...defaultState } };
  });

  it('should ', function () {
    
  });

});
