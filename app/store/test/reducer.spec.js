import reducer, {
  selectNode,
  selectResults,
  selectTest,
  selectTestIsFinished,
  selectTestIsRunning,
} from './reducer';
import { failure, fetchTestSucceeded, startTest, success } from './actions';
import { stateKeys } from '../../types';
import { test as mockedTest } from '../../services/api/mocked-api-methods/mock-data.json';

const defaultState = {
  error: { message: null, code: null },
  fetching: false,
  node: {},
  path: [],
  results: [],
  test: {},
  testIsFinished: false,
  testIsRunning: false,
  userResponses: [],
};
let state = {
  [stateKeys.TEST]: {},
};

function updateState(action) {
  state = {
    [stateKeys.TEST]: reducer(state.test, action),
  };
}

// On storing the test, we add indexes to the subTests,
// and we use this index to help navigating from one subTest to another.
mockedTest.subTests.map((subTest, index) => ({ ...subTest, index }));
describe('Test Test actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.TEST]: { ...defaultState } };
  });

  it(`does not start test if test isn't fetched and stored.
      AKA. does not crash if you try to start the test without any test loaded...`, () => {
    updateState(startTest());
    expect(selectTestIsRunning(state)).toBe(false);
  });

  it('can store and select the whole test ', () => {
    // This is the whole test, including all the subTests and all subTest-Nodes
    updateState(fetchTestSucceeded(mockedTest));
    expect(selectTest(state)).toEqual(mockedTest);
  });

  it('starts the test', () => {
    updateState(fetchTestSucceeded(mockedTest));
    updateState(startTest(state));
    expect(selectTestIsRunning(state)).toBe(true);
    expect(selectTestIsFinished(state)).toBe(false);

    expect(selectTest(state)).toEqual(mockedTest);
    expect(selectNode(state)).toEqual(mockedTest.subTests[0]);
  });

  it('can go to next node on success (traversing the whole test-tree, path of success)', () => {
    updateState(fetchTestSucceeded(mockedTest));
    updateState(startTest(state));
    let pointer = mockedTest.subTests[0];

    expect(selectNode(state)).toEqual(pointer);
    while (selectNode(state).success) {
      updateState(success({ reactionTimeMs: 800, numberOfClicks: 1 }));
      if (pointer.success) {
        pointer = pointer.success;
        if (!pointer.success) {
          // this is a leaf-node. We should expect the first node from the next tree
          pointer = selectTest(state).subTests[selectResults(state).length]; // Setting pointer to the first node in next tree.
          // But if we are on the last subTest, the pointer will be undefined. Since we don't have a next tree...
          if (pointer === undefined) {
            // So we expect an empty node with a message:
            pointer = { message: 'We are finished' };
          }
        }
      }
      expect(selectNode(state)).toEqual(pointer);
    }
    // Todo: Validate that the test-tree has all the userResponses added to it.
    // Todo: Validate that all the results are present.
  });

  it('can go to next node on failure (traversing the whole test-tree, path of failure)', () => {
    updateState(fetchTestSucceeded(mockedTest));
    updateState(startTest(state));
    let pointer = mockedTest.subTests[0];

    expect(selectNode(state)).toEqual(pointer);
    while (selectNode(state).failure) {
      updateState(failure({ reactionTimeMs: 800, numberOfClicks: 1 }));
      if (pointer.failure) {
        pointer = pointer.failure;
        if (!pointer.failure) {
          // this is a leaf-node. We should expect the first node from the next tree
          pointer = selectTest(state).subTests[selectResults(state).length]; // Setting pointer to the first node in next tree.
          // But if we are on the last subTest, the pointer will be undefined. Since we don't have a next tree...
          if (pointer === undefined) {
            // So we expect an empty node with a message:
            pointer = { message: 'We are finished' };
          }
        }
      }
      expect(selectNode(state)).toEqual(pointer);
    }
    // Todo: Validate that the test-tree has all the userResponses added to it.
    // Todo: Validate that all the results are present.
  });
});
