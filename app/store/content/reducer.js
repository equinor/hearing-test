import { handleActions } from 'redux-actions';
import {
  fetchServiceMessageRequested,
  fetchServiceMessageSucceeded,
  fetchServiceMessageFailed,
  dismissServiceMessage,
} from './actions';
import { stateKeys } from '../../types';

const defaultState = {
  content: {
    message: '',
  },
  fetching: false,
};


// const serviceMessage = state => state[stateKeys.SERVICEMESSAGE];

// export const selectServiceMessage = state => serviceMessage(state).content.message || '';
//
// export const isFetching = state => serviceMessage(state).fetching;
