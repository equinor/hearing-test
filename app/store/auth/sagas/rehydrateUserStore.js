import { call } from 'redux-saga/effects';
import { createPersistor } from 'redux-persist';
import store, { getPersistedState, getUserPersistConfig } from '../../../store/config';

const persistors = {};

export default function* rehydrateUserStore(userId) {
  const userPrefix = `user/${userId}`;
  let persistor = persistors[userPrefix];

  const conf = yield call(getUserPersistConfig, userPrefix);

  const userState = yield call(getPersistedState, conf);

  // Pause all known persistors
  Object.keys(persistors).forEach(key => {
    persistors[key].pause();
  });

  if (!persistor) {
    persistor = yield call(createPersistor, store, conf);
    yield call(persistor.rehydrate, userState);
  } else {
    yield call(persistor.resume);
    yield call(persistor.rehydrate, userState);
  }
}
