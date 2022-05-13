import "react-native";
import { shallow } from "enzyme";
import React from "react";
import sinon from "sinon";

import { ReleaseNotes } from "../../../services/api/mocked-api-methods/mock-data.json";
import ChangeLog from "./ChangeLog";

it("renders correctly", () => {
  const goToMain = sinon.spy();
  const props = {
    releaseNote: {},
    fetching: true,
    affirm: goToMain,
  };
  const wrapper = shallow(<ChangeLog {...props} />);
  expect(wrapper).toMatchSnapshot();
  expect(goToMain.calledOnce).toBe(false);
  wrapper.setProps({ releaseNote: ReleaseNotes, fetching: false });
  expect(wrapper).toMatchSnapshot();
  wrapper.find("Button").simulate("press");
  expect(goToMain.calledOnce).toBe(true);
});
