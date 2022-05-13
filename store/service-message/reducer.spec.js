import { stateKeys } from "../../app/types";
import * as actions from "./actions";
import reducer from "./reducer";

const defaultState = {
  content: {
    message: "",
  },
  fetching: false,
};

let state = {
  [stateKeys.SERVICEMESSAGE]: {},
};

describe("Test ServiceMessage actions, reducers and selectors", () => {
  beforeEach(() => {
    state = { [stateKeys.SERVICEMESSAGE]: { ...defaultState } };
  });

  it("should have the correct default state", () => {
    expect(state).toEqual({
      [stateKeys.SERVICEMESSAGE]: {
        content: {
          message: "",
        },
        fetching: false,
      },
    });
  });
});
