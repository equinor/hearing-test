import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectTest } from "../store/test/reducer";

export const useHearingTestProgressBar = () => {
  const [numberOfNodesPlayed, setNumberOfNodesPlayed] = useState(0);
  const [numberOfNodes, setNumberOfNodes] = useState(Infinity);
  const [isProgressBarInitialized, setIsProgressBarInitialized] =
    useState(false);
  const progress = numberOfNodesPlayed / numberOfNodes;
  const test = useSelector(selectTest);

  const initializeProgressBar = () => {
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
    setNumberOfNodes(nodeCount);
    setIsProgressBarInitialized(true);
  };

  useEffect(() => {
    if (!isProgressBarInitialized && Object.keys(test).length > 0) {
      initializeProgressBar();
    }
  }, [isProgressBarInitialized, test]);

  return {
    progress,
    setNumberOfNodesPlayed,
  };
};
