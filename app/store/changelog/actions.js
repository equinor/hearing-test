import { createAction } from 'redux-actions';

export const fetchChangelog = createAction('Changelog/FETCH');
export const fetchChangelogRequested = createAction('Changelog/FETCH_REQUESTED');
export const fetchChangelogSucceeded = createAction('Changelog/FETCH_SUCCEDED');
export const fetchChangelogFailed = createAction('Changelog/FETCH_FAILED');
