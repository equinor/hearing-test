import _ from "lodash";
import { handleActions } from "redux-actions";

import { stateKeys } from "../../types";
import { addUnsentTest, removeUnsentTest } from "./actions";

const removeTestFromState = (state, test) => {
  const clonedState = _.cloneDeep(state);
  const unsentTests = clonedState.filter(
    (unsentTest) => unsentTest.id !== test.id
  );

  return unsentTests;
};

export default handleActions(
  {
    [addUnsentTest]: (state, action) => [...state, action.payload],
    [removeUnsentTest]: (state, action) =>
      removeTestFromState(state, action.payload),
  },
  []
);

export const getUnsentTests = (state) => state[stateKeys.UNSENTTESTS];
