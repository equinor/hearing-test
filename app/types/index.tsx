export const stateKeys = {
  AUTH: 'currentUser',
  CONNECTIVITY: 'connectivity',
  VERSION: 'version',
  MANIFEST: 'schemaVersion',
  CHANGELOG: 'releaseNote',
  SERVICEMESSAGE: 'serviceMessage',
  TOAST: 'toast',
  NAV: 'navigation',
  TEST: 'test',
  TESTS: 'tests',
};

export const requestTypes = {
  NONE: 'NONE',
  REQUESTED: 'REQUESTED',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

export const authStatusTypes = {
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
  AUTHENTICATING: 'NOT_AUTHENTICATED',
  AUTHENTICATED: 'AUTHENTICATED',
  FAILED: 'FAILED',
  SIGNED_OUT: 'SIGNED_OUT',
};

export type TestResult = {
  audiogram: string;
  name: string;
  dateTaken: number;
  id: string;
  userId: string;
};

export type SoundCheckPageJSON = {
  title: string;
  description: string;
  button: 'variant1' | 'variant2';
  hearNoSoundButtonVisible: boolean;
  sound: {
    play: boolean;
    ear?: 'left' | 'right';
  };
};
