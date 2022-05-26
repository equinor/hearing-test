import { call, put, takeLatest, select } from "redux-saga/effects";

import api from "../../services/api";
import * as actions from "./actions";

function* fetchTests() {
  try {
    const mode =  yield select((state) => state.appConfig.current.demoMode);
    yield put(actions.fetchTestsRequested());
    const response = yield call(api.fetchTests, mode);
    yield put(actions.fetchTestsSucceeded(response));
  } catch (ex) {
    yield put(actions.fetchTestsFailed(ex));
  }
}

export function* watchFetchTests() {
  yield takeLatest(actions.fetchTests.toString(), fetchTests);
}
