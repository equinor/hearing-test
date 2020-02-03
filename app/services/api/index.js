/**
 * The configuration in mock-config.js will be used to either
 * load the regular api methods or the mocked ones.
 */

import config from '../../mock-config';

if (config.enabled && config.mockAuthentication && !config.mockApi) {
  throw new Error(
    'You cannot connect to a non-mocked api while mockAuthentication is enabled in mock-config.'
  );
}

const api =
  config.enabled && config.mockApi ? require('./mocked-api-methods') : require('./api-methods');

export default api;
