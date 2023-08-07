import { watchPostTakeTest, watchPostTest } from "../test/saga";
import { watchFetchTests } from "../tests/saga";

const root = function* rootSaga() {
  yield [watchPostTakeTest(), watchPostTest(), watchFetchTests()];
};

export default root;
