import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHearingNavigation } from "./useHearingNavigation";
import { postTest } from "../store/test/actions";
import { selectTest, selectTestIsFinished } from "../store/test/reducer";

export const useHearingTestIsFinished = () => {
  const test = useSelector(selectTest);
  const testIsFinished = useSelector(selectTestIsFinished);
  const navigation = useHearingNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (testIsFinished) {
      dispatch(postTest(test));
      navigation.navigate("TestResultRoute");
    }
  }, [testIsFinished]);
};
