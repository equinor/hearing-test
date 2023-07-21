import { call, put, takeLatest } from "redux-saga/effects";

import * as actions from "./actions";
import * as api from "../../services/api/api-methods";

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
