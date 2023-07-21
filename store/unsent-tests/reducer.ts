import { cloneDeep } from "lodash";
import { handleActions } from "redux-actions";

import { addUnsentTest, removeUnsentTest } from "./actions";
import { stateKeys } from "../../types";

const addTestToState = (state, test) => {
  const index = state.findIndex((unsentTest) => unsentTest.id === test.id);

  if (index === -1) {
    const clonedState = cloneDeep(state);
    clonedState.push(test);
    return clonedState;
  }

  return state;
};

const removeTestFromState = (state, test) => {
  const clonedState = cloneDeep(state);
  const unsentTests = clonedState.filter(
    (unsentTest) => unsentTest.id !== test.id
  );

  return unsentTests;
};

export default handleActions(
  {
    [addUnsentTest]: (state, action) => addTestToState(state, action.payload),
    [removeUnsentTest]: (state, action) =>
      removeTestFromState(state, action.payload),
  },
  []
);

export const getUnsentTests = (state) => state[stateKeys.UNSENTTESTS];
