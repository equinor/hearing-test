import { delay } from "redux-saga";
import { put, call } from "redux-saga/effects";

import mockConfig from "../../../app/mock-config";
import * as actions from "../actions";
import rehydrateUserStore from "./rehydrateUserStore";

export function* signOutFlow() {
  yield put(actions.loginReset());
}

export function* signInFlow() {
  yield put(actions.loginRequested());
  yield delay(100);
  yield call(rehydrateUserStore, mockConfig.mockedUser.userId);
  yield put(actions.loginSucceeded(mockConfig.mockedUser));
}
