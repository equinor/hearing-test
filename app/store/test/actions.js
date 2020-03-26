import { createAction } from 'redux-actions';

export const fetchTest = createAction('Test/FETCH');
export const fetchTestRequested = createAction('Test/FETCH_REQUESTED');
export const fetchTestSucceeded = createAction('Test/FETCH_SUCCEEDED');
export const fetchTestFailed = createAction('Test/FETCH_FAILED');

export const postTest = createAction('Test/POST');
export const postTestRequested = createAction('Test/POST_REQUESTED');
export const postTestSucceeded = createAction('Test/POST_SUCCEEDED');
export const postTestFailed = createAction('Test/POST_FAILED');

export const setSubTest = createAction('SubTest/Update');
export const success = createAction('SubTest/Success');
export const failure = createAction('SubTest/Failure');

export const startTest = createAction('Test/START');
export const stopTest = createAction('Test/STOP');

export const registerPress = createAction('Test/Register_Press');

export const appStartupInit = createAction('AppStartup/INIT');
export const appStartupInitRequested = createAction('AppStartup/INIT_REQUESTED');
export const appStartupInitSucceeded = createAction('AppStartup/INIT_SUCCEEDED');
export const appStartupInitFailed = createAction('AppStartup/INIT_FAILED');
