import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTests } from "../store/tests/actions";
import { selectIsFetchingTests, selectTests } from "../store/tests/reducer";

export const useTestResults = () => {
  const unsortedTestsResults = useSelector((state) => selectTests(state));
  const isFetching = useSelector((state) => selectIsFetchingTests(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const sortedTestResults = useMemo(
    () =>
      unsortedTestsResults.sort(
        (a, b) =>
          new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime()
      ),
    [unsortedTestsResults]
  );

  return { isFetching, testResults: sortedTestResults };
};
