import { combineReducers } from 'redux';
import versionReducer from '../version/reducer';
import connectivityReducer from '../connectivity/reducer';
import manifestReducer from '../manifest';
import authReducer from '../auth/reducer';
import changelogReducer from '../changelog/reducer';
import serviceMessageReducer from '../service-message/reducer';
import toastReducer from '../toast/reducer';
import { stateKeys } from '../../types';

export default combineReducers({
  [stateKeys.MANIFEST]: manifestReducer,
  [stateKeys.VERSION]: versionReducer,
  [stateKeys.CONNECTIVITY]: connectivityReducer,
  [stateKeys.CHANGELOG]: changelogReducer,
  [stateKeys.SERVICEMESSAGE]: serviceMessageReducer,
  [stateKeys.AUTH]: authReducer,
  [stateKeys.TOAST]: toastReducer,
});
