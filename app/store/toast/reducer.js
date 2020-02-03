import { handleActions } from 'redux-actions';
import { addToast } from './actions';

export default handleActions(
  {
    [addToast]: (state, action) => ({
      message: action.payload,
    }),
  },
  { message: null }
);

export const getToast = state => state.toast.message;
