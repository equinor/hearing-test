import { put, call, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';

function* fetchChangelog(action) {
  try {
    yield put(actions.fetchChangelogRequested());
    const response = yield call(api.getReleaseNote, action.payload);
    yield put(actions.fetchChangelogSucceeded(response));
  } catch (ex) {
    // Posible that release does not have any release notes, and cause an error
    // yield call(handelError, ex);
    yield put(actions.fetchChangelogFailed());
  }
}

export default function* watchFetchChangelog() {
  yield takeLatest(actions.fetchChangelog.toString(), fetchChangelog);
}
