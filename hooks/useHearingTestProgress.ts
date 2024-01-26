import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { selectTest } from "../store/test/reducer";

export const useHearingTestProgress = () => {
  const [numberOfNodesPlayed, setNumberOfNodesPlayed] = useState(0);
  const test = useSelector(selectTest);

  const numberOfNodes = useMemo(() => {
    if (Object.keys(test).length === 0) return Infinity;
    const { subTests } = test;
    let nodeCount = 0;
    for (let i = 0; i < subTests.length; i++) {
      let node = subTests[i];
      while (node) {
        nodeCount++;
        // The same number of success- and failure nodes exist
        node = node.success;
      }
    }
    // The leaf nodes are not test nodes
    nodeCount -= subTests.length;
    return nodeCount;
  }, [test]);

  const progress = numberOfNodesPlayed / numberOfNodes;

  return {
    progress,
    setNumberOfNodesPlayed,
  };
};
