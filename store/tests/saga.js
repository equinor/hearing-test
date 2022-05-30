import { call, put, takeLatest } from "redux-saga/effects";

import api from "../../services/api";
import * as actions from "./actions";

function* fetchTests() {
  try {
    yield put(actions.fetchTestsRequested());
    const response = yield call(api.fetchTests);
    yield put(actions.fetchTestsSucceeded(response));
  } catch (ex) {
    yield put(actions.fetchTestsFailed(ex));
  }
}

export function* watchFetchTests() {
  yield takeLatest(actions.fetchTests.toString(), fetchTests);
}
