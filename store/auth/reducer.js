import { handleActions } from "redux-actions";

import { authStatusTypes, stateKeys } from "../../app/types";
import * as actions from "./actions";

const defaultState = {
  user: null,
  authStatus: authStatusTypes.NOT_AUTHENTICATED,
};

export default handleActions(
  {
    [actions.loginSucceeded]: (state, action) => ({
      ...state,
      authStatus: authStatusTypes.AUTHENTICATED,
      user: action.payload,
    }),
    [actions.loginRequested]: (state) => ({
      ...state,
      authStatus: authStatusTypes.AUTHENTICATING,
    }),
    [actions.loginFailed]: (state) => ({
      ...state,
      authStatus: authStatusTypes.FAILED,
    }),
    [actions.loginReset]: (state) => ({
      ...state,
      authStatus: authStatusTypes.SIGNED_OUT,
    }),
  },
  defaultState
);

const getAuthState = (state) => state[stateKeys.AUTH];

export const getCurrentUser = (state) => getAuthState(state).user;

export const getAuthStatus = (state) => getAuthState(state).authStatus;
