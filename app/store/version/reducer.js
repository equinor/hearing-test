import { handleActions } from 'redux-actions';
import { setVersion, clearVersion } from './actions';
import { stateKeys } from '../../types';

export default handleActions(
  {
    [setVersion]: (state, action) => ({
      current: action.payload,
    }),
    [clearVersion]: () => ({
      current: null,
    }),
  },
  { current: null }
);

export const getVersion = state => state[stateKeys.VERSION].current;
