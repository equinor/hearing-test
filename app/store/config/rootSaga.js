import watchAuthentication from '../auth/sagas';
import watchFetchChangelog from '../changelog/saga';
import watchFetchServiceMessage from '../service-message/saga';
import { watchAppInit, watchFetchTest, watchPostTest } from '../test/saga';

const root = function* rootSaga() {
  yield [
    watchAppInit(),
    watchAuthentication(),
    watchFetchChangelog(),
    watchFetchServiceMessage(),
    watchFetchTest(),
    watchPostTest(),
  ];
};

export default root;
