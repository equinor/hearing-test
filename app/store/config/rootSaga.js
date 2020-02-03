import watchAuthentication from '../auth/sagas';
import watchFetchChangelog from '../changelog/saga';
import watchFetchServiceMessage from '../service-message/saga';

const root = function* rootSaga() {
  yield [watchFetchChangelog(), watchAuthentication(), watchFetchServiceMessage()];
};

export default root;
