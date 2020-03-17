import { put, call, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import * as actions from './actions';
import handelError from '../../utils/handleNetworkErrors';

function* fetchTest(action) {
  try {
    yield put(actions.fetchTestRequested());
    const response = yield call(api.fetchTest, action.payload);
    yield put(actions.fetchTestSucceeded(response));
  } catch (ex) {
    yield call(handelError, ex);
    yield put(actions.fetchTestFailed());
  }
}

export default function* watchFetchTest() {
  yield takeLatest(actions.fetchTest.toString(), fetchTest);
}
