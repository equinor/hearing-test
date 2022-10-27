import { put, call, takeLatest, select } from "redux-saga/effects";

import api from "../../services/api";
import handleError from "../../utils/handleNetworkErrors";
import { addUnsentTest, removeUnsentTest } from "../unsent-tests/actions";
import { getUnsentTests } from "../unsent-tests/reducer";
import * as actions from "./actions";

function* postTakeTest(action) {
  try {
    yield put(actions.postTakeTestRequested());
    const response = yield call(api.postTakeTest, action.payload);
    const sounds = yield call(api.fetchSounds);
    yield put(actions.postTakeTestSucceeded({ ...response, sounds }));
  } catch (ex) {
    yield put(actions.postTakeTestFailed(ex));
  }
}
function* postTest(action) {
  const unsentTests = yield select(getUnsentTests);
  try {
    yield put(actions.postTestRequested());
    const response = yield call(api.postTest, action.payload);
    if (unsentTests.length > 0) {
      yield put(removeUnsentTest(action.payload));
    }
    yield put(actions.postTestSucceeded(response));
  } catch (ex) {
    yield put(addUnsentTest(action.payload));
    yield put(actions.postTestFailed(ex));
  }
}

function* appInit(action) {
  try {
    yield put(actions.appStartupInitRequested());
    const response = yield call(api.appInit, action.payload);
    yield put(actions.appStartupInitSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.appStartupInitFailed(ex));
  }
}

export function* watchPostTakeTest() {
  yield takeLatest(actions.postTakeTest.toString(), postTakeTest);
}

export function* watchPostTest() {
  yield takeLatest(actions.postTest.toString(), postTest);
}

export function* watchAppInit() {
  yield takeLatest(actions.appStartupInit.toString(), appInit);
}
