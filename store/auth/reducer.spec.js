import { authStatusTypes, stateKeys } from "../../types";
import * as actions from "./actions";
import reducer, { getAuthStatus, getCurrentUser } from "./reducer";

const defaultState = {
  user: null,
  authStatus: authStatusTypes.NOT_AUTHENTICATED,
};
const testUserData = {
  user: {
    userId: "123",
  },
};

let state;

it("sets the correct auth statuses and user object", () => {
  state = {
    [stateKeys.AUTH]: { ...defaultState },
  };

  expect(state).toEqual({
    [stateKeys.AUTH]: {
      user: null,
      authStatus: authStatusTypes.NOT_AUTHENTICATED,
    },
  });

  let action = actions.loginRequested();
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(getAuthStatus(state)).toBe(authStatusTypes.AUTHENTICATING);
  expect(getCurrentUser(state)).toBeNull();

  action = actions.loginSucceeded(testUserData);
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(getAuthStatus(state)).toBe(authStatusTypes.AUTHENTICATED);
  expect(getCurrentUser(state)).toEqual({ ...testUserData });

  action = actions.loginRequested();
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(getAuthStatus(state)).toBe(authStatusTypes.NOT_AUTHENTICATED);

  action = actions.loginFailed();
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(getAuthStatus(state)).toBe(authStatusTypes.FAILED);

  action = actions.loginReset();
  state = {
    [stateKeys.AUTH]: reducer(state.currentUser, action),
  };
  expect(getAuthStatus(state)).toBe(authStatusTypes.SIGNED_OUT);
});
