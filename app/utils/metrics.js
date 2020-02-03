// import HockeyApp from 'react-native-hockeyapp';

// modifier optional
export const track = (eventName, modifier) => {
  if (!modifier) {
    // HockeyApp.trackEvent(eventName);
  } else {
    // HockeyApp.trackEvent(eventName + modifier);
  }
};

export const metricKeys = {};

metricKeys.APP_STARTED = 'Application STARTED';
metricKeys.APP_ACTIVE = 'Application ACTIVE';
metricKeys.APP_BACKGROUND = 'Application BACKGROUND';

metricKeys.AUTHENTICATION_STARTED = 'Authentication STARTED';
metricKeys.AUTHENTICATION_SUCCESS = 'Authentication SUCCESS';
metricKeys.AUTHENTICATION_FAILED = 'Authentication FAILED';
metricKeys.AUTHENTICATION_CANCELLED = 'Authentication CANCELLED';
metricKeys.AUTHENTICATION_LOCKEDOUT =
  'User does not have a active ServiceNow user or is locked out';

metricKeys.AUTHENTICATION_VALIDATON_STARTED = 'Authentication validation STARTED';
metricKeys.AUTHENTICATION_VALIDATON_SUCCESS = 'Authentication validation SUCCESS';
metricKeys.AUTHENTICATION_VALIDATON_FAILED = 'Authentication validation FAILED';

metricKeys.AUTHENTICATION_TOKEN_NOT_ACQUIRED = 'Token not acquired';
metricKeys.FEEDBACK_CLICK = 'Feedback CLICKED';

metricKeys.FEED_VIEW = 'Feed VIEW';
