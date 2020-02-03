/**
 * These tests test the generator functions only (unit tests),
 * and NOT how the sagas changes the application state (end-to-end test)
 */
import { put, call, select } from 'redux-saga/effects';
import { signInFlow, signOutFlow } from './authFlow';
import rehydrateUserStore from './rehydrateUserStore';
import { getIsConnected } from '../../connectivity';
import * as actions from '../actions';
import {
  authenticate,
  authenticateSilently,
  logout,
  getRefreshToken,
} from '../../../services/adal';
import { getConfiguredResources } from '../../../settings';

describe('auth sagas', () => {
  const isConnected = true;
  const allResources = getConfiguredResources();
  const authResult = {
    userInfo: {
      userId: 'abc',
    },
  };

  it('should generate the correct non-silent authentication flow', () => {
    const gen = signInFlow(actions.login());
    expect(gen.next().value).toEqual(put(actions.loginRequested()));
    gen.next(); // delay
    expect(gen.next().value).toEqual(call(getConfiguredResources));
    expect(gen.next(allResources).value).toEqual(select(getIsConnected));
    expect(gen.next(isConnected).value).toEqual(call(authenticate, allResources));
    expect(gen.next(authResult).value).toEqual(
      call(rehydrateUserStore, authResult.userInfo.userId)
    );
    expect(gen.next().value).toEqual(put(actions.loginSucceeded(authResult.userInfo)));
    expect(gen.next().done).toBe(true);
  });

  it('should generate the correct silent authentication flow', () => {
    const gen = signInFlow(actions.login(true));
    expect(gen.next().value).toEqual(put(actions.loginRequested()));
    gen.next(); // delay
    expect(gen.next().value).toEqual(call(getConfiguredResources));
    expect(gen.next(allResources).value).toEqual(select(getIsConnected));
    expect(gen.next(isConnected).value).toEqual(call(authenticateSilently, allResources));
    expect(gen.next(authResult).value).toEqual(
      call(rehydrateUserStore, authResult.userInfo.userId)
    );
    expect(gen.next().value).toEqual(put(actions.loginSucceeded(authResult.userInfo)));
    expect(gen.next().done).toBe(true);
  });

  it('should generate the correct authentication flow when not connected', () => {
    const gen = signInFlow(actions.login(true));
    expect(gen.next().value).toEqual(put(actions.loginRequested()));
    gen.next(); // delay
    expect(gen.next().value).toEqual(call(getConfiguredResources));
    expect(gen.next(allResources).value).toEqual(select(getIsConnected));
    expect(gen.next(false).value).toEqual(call(getRefreshToken));
    expect(gen.next(authResult).value).toEqual(
      call(rehydrateUserStore, authResult.userInfo.userId)
    );
    expect(gen.next().value).toEqual(put(actions.loginSucceeded(authResult.userInfo)));
    expect(gen.next().done).toBe(true);
  });

  it('should reset login if unhandled error is thrown in authentication flow', () => {
    const gen = signInFlow(actions.login(true));
    expect(gen.next().value).toEqual(put(actions.loginRequested()));
    gen.next(); // delay
    expect(gen.next().value).toEqual(call(getConfiguredResources));
    expect(gen.next(allResources).value).toEqual(select(getIsConnected));
    expect(gen.next(isConnected).value).toEqual(call(authenticateSilently, allResources));
    expect(gen.next(new Error('error')).value).toEqual(put(actions.loginReset()));
  });

  it('should generate the correct signout flow', () => {
    const gen = signOutFlow();
    expect(gen.next().value).toEqual(call(logout));
    expect(gen.next().value).toEqual(put(actions.loginReset()));
    expect(gen.next().done).toBe(true);
  });
});
