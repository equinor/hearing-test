import watchAuthentication from '../auth/sagas';
import watchFetchChangelog from '../changelog/saga';
import watchFetchServiceMessage from '../service-message/saga';
import watchFetchTest from '../test/saga';

const root = function* rootSaga() {
  yield [
    watchFetchChangelog(),
    watchAuthentication(),
    watchFetchServiceMessage(),
    watchFetchTest(),
  ];
};

export default root;
