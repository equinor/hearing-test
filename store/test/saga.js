import { put, call, takeLatest } from "redux-saga/effects";

import handleError from "../../app/utils/handleNetworkErrors";
import api from "../../services/api";
import * as actions from "./actions";

function* fetchTest(action) {
  try {
    yield put(actions.fetchTestRequested());
    const response = yield call(api.fetchTest, action.payload);
    yield put(actions.fetchTestSucceeded(response));
  } catch (ex) {
    yield put(actions.fetchTestFailed(ex));
  }
}
function* postTest(action) {
  try {
    yield put(actions.postTestRequested());
    const response = yield call(api.postTest, action.payload);
    yield put(actions.postTestSucceeded(response));
  } catch (ex) {
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

export function* watchFetchTest() {
  yield takeLatest(actions.fetchTest.toString(), fetchTest);
}

export function* watchPostTest() {
  yield takeLatest(actions.postTest.toString(), postTest);
}

export function* watchAppInit() {
  yield takeLatest(actions.appStartupInit.toString(), appInit);
}
