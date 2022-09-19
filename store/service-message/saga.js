import { put, call, takeLatest } from "redux-saga/effects";

import api from "../../services/api";
import handleError from "../../utils/handleNetworkErrors";
import * as actions from "./actions";

function* fetchServiceMessage(action) {
  try {
    yield put(actions.fetchServiceMessageRequested());
    const response = yield call(api.getServiceMessage, action.payload);
    yield put(actions.fetchServiceMessageSucceeded(response));
  } catch (ex) {
    yield call(handleError, ex);
    yield put(actions.fetchServiceMessageFailed());
  }
}

export default function* watchFetchServiceMessage() {
  yield takeLatest(actions.fetchServiceMessage.toString(), fetchServiceMessage);
}
