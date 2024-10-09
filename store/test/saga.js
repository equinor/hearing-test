import { put, call, takeLatest, select } from "redux-saga/effects";

import * as actions from "./actions";
import * as api from "../../services/api/api-methods";
import { addUnsentTest, removeUnsentTest } from "../unsent-tests/actions";
import { getUnsentTests } from "../unsent-tests/reducer";

function* postTakeTest(action) {
  try {
    yield put(actions.postTakeTestRequested());
    const response = yield call(api.postTakeTest, action.payload);
    yield put(actions.postTakeTestSucceeded(response));
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

export function* watchPostTakeTest() {
  yield takeLatest(actions.postTakeTest.toString(), postTakeTest);
}

export function* watchPostTest() {
  yield takeLatest(actions.postTest.toString(), postTest);
}
