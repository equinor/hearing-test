import watchAuthentication from '../auth/sagas';
import watchFetchChangelog from '../changelog/saga';
import watchFetchServiceMessage from '../service-message/saga';
import { watchAppInit, watchFetchTest, watchPostTest } from '../test/saga';
import { watchFetchTests } from '../tests/saga';

const root = function* rootSaga() {
  yield [
    watchAppInit(),
    watchAuthentication(),
    watchFetchChangelog(),
    watchFetchServiceMessage(),
    watchFetchTest(),
    watchPostTest(),
    watchFetchTests(),
  ];
};

export default root;
