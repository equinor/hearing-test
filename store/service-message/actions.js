import { createAction } from 'redux-actions';

export const fetchServiceMessage = createAction('ServiceMessage/FETCH');
export const fetchServiceMessageRequested = createAction('ServiceMessage/FETCH_REQUESTED');
export const fetchServiceMessageSucceeded = createAction('ServiceMessage/FETCH_SUCCEEDED');
export const fetchServiceMessageFailed = createAction('ServiceMessage/FETCH_FAILED');
export const dismissServiceMessage = createAction('ServiceMessage/DISMISS');
