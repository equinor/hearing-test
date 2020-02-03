import reducer, { selectChangeLog, isFetching } from './reducer';
import * as actions from './actions';
import { ReleaseNotes } from '../../services/api/mocked-api-methods/mock-data.json';
import { stateKeys } from '../../types';

const defaultState = { content: {}, fetching: false };
let state = {
  [stateKeys.CHANGELOG]: {},
};
describe('fetch changelog actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.CHANGELOG]: { ...defaultState } };
  });

  it('should have the correct default state', () => {
    expect(state).toEqual({
      [stateKeys.CHANGELOG]: {
        content: {},
        fetching: false,
      },
    });
  });

  it('should set fetching to true when fetch changelog is requested and reset if it fails', () => {
    let action = actions.fetchChangelogRequested();
    state = {
      [stateKeys.CHANGELOG]: reducer(state.releaseNote, action),
    };
    expect(selectChangeLog(state)).toEqual({});
    expect(isFetching(state)).toBe(true);
    action = actions.fetchChangelogFailed();
    state = {
      [stateKeys.CHANGELOG]: reducer(state.releaseNote, action),
    };
    expect(isFetching(state)).toBe(false);
    expect(selectChangeLog(state)).toEqual({});
  });

  it('should set the correct state and the selectors should return the correct values after fetch is successful', () => {
    let action = actions.fetchChangelogRequested();
    state = {
      [stateKeys.CHANGELOG]: reducer(state.releaseNote, action),
    };
    action = actions.fetchChangelogSucceeded(ReleaseNotes);
    state = {
      [stateKeys.CHANGELOG]: reducer(state.releaseNote, action),
    };
    expect(isFetching(state)).toBe(false);
    expect(selectChangeLog(state)).toEqual(ReleaseNotes);
  });
});
