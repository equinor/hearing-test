import { delay } from "redux-saga";
import { put, call, select } from "redux-saga/effects";

import { getConfiguredResources } from "../../../constants/settings";
import {
  authenticate,
  authenticateSilently,
  logout,
  AdalError,
  getRefreshToken,
} from "../../../services/adal";
import adalErrorCodes from "../../../services/adalErrorCodes";
import { getIsConnected } from "../../connectivity";
import * as actions from "../actions";
import rehydrateUserStore from "./rehydrateUserStore";

const getErrorMessage = (code) => {
  switch (code) {
    case adalErrorCodes.AD_ERROR_UI_USER_CANCEL:
      return null;
    default:
      return "failed to login";
  }
};

export function* signOutFlow() {
  yield call(logout);

  yield put(actions.loginReset());
}

export function* signInFlow(action) {
  yield put(actions.loginRequested());
  yield delay(100);

  const silent = !!action.payload;
  const allResources = yield call(getConfiguredResources);
  const hasConnectivity = yield select(getIsConnected);

  let authResult;

  try {
    if (hasConnectivity && silent) {
      authResult = yield call(authenticateSilently, allResources);
    } else if (hasConnectivity) {
      authResult = yield call(authenticate, allResources);
    } else {
      authResult = yield call(getRefreshToken);
    }
    const { userInfo } = authResult;

    yield call(rehydrateUserStore, userInfo.userId);

    yield put(actions.loginSucceeded(userInfo));
  } catch (ex) {
    if (ex instanceof AdalError) {
      // Logout user for all cache errors
      if (ex.code === 403) {
        yield put(actions.loginReset());
      } else if (ex.code === 200 || (ex.code >= 300 && ex.code <= 399)) {
        yield call(signOutFlow);
      } else if (!silent) {
        const error = getErrorMessage(ex.code);
        yield put(actions.loginFailed(error));
      }
    } else if (!silent) {
      yield put(actions.loginFailed());
    } else {
      yield put(actions.loginReset());
    }
    throw ex;
  }
}
