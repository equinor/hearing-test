import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from "react";
import SystemSetting from "react-native-system-setting";
import { useDispatch, useSelector } from "react-redux";

import { useHearingNavigation } from "./useHearingNavigation";
import { useHearingTestIsFinished } from "./useHearingTestIsFinished";
import { useHearingTestProgress } from "./useHearingTestProgress";
import { useHearingTestSounds } from "./useHearingTestSounds";
import {
  continueTest as actionContinueTest,
  failure as actionFailure,
  pauseTest as actionPauseTest,
  postTakeTest as actionPostTakeTest,
  resetTestState as actionResetTestState,
  startTest as actionStartTest,
  success as actionSuccess,
} from "../store/test/actions";
import {
  selectIsFetching,
  selectNode,
  selectTest,
  selectTestIsRunning,
} from "../store/test/reducer";
import { Node, ObjectValues } from "../types";

const postDelayMs = 1500;

export const DIALOG = {
  HIDDEN: "hidden",
  OPEN: "open",
  SUBDIALOG: "subdialog",
} as const;

type Dialog = ObjectValues<typeof DIALOG>;

export const useHearingTest = () => {
  const [pauseAfterNode, setPauseAfterNode] = useState(false);
  const [dialog, setDialog] = useState<Dialog>(DIALOG.HIDDEN);
  const isDialogOpen = dialog === DIALOG.OPEN || dialog === DIALOG.SUBDIALOG;

  const isFetching = useSelector(selectIsFetching);
  const testIsRunning = useSelector(selectTestIsRunning);
  const test = useSelector(selectTest);
  const node = useSelector(selectNode);

  const previousNodeRef = useRef<Node>();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const timerMsRef = useRef(0);
  const preDelayMsRef = useRef(2000);
  const soundDurationMsRef = useRef(500);
  const reactionTimeMsRef = useRef<number | null>(null);
  const isPlayingFirstNodeFirstTimeRef = useRef(true);
  const numberOfPressesRef = useRef(0);
  const prevSuccessRef = useRef(true);
  const successRef = useRef(false);

  const { progress, setNumberOfNodesPlayed } = useHearingTestProgress();
  const navigation = useHearingNavigation();
  const { isConnected } = useNetInfo();
  const dispatch = useDispatch();
  const { isSoundsLoaded, getSoundDurationMs, playSound } =
    useHearingTestSounds();
  useHearingTestIsFinished();

  useEffect(() => {
    return () => {
      dispatch(actionResetTestState());
    };
  }, []);

  useEffect(() => {
    if (isConnected && !isFetching && Object.keys(test).length === 0) {
      dispatch(actionPostTakeTest());
    }
  }, [isConnected, isFetching, test]);

  useEffect(() => {
    if (pauseAfterNode && !isDialogOpen && previousNodeRef.current !== node) {
      dispatch(actionPauseTest());
      setPauseAfterNode(false);
      setDialog(DIALOG.OPEN);
    }
  }, [pauseAfterNode, isDialogOpen, node]);

  useEffect(() => {
    if (!testIsRunning || pauseAfterNode || isDialogOpen) {
      return;
    }

    runNode();
  }, [testIsRunning, pauseAfterNode, isDialogOpen, node]);

  const runNode = () => {
    if (previousNodeRef.current?.data.index !== 1 && node.data.index === 1) {
      isPlayingFirstNodeFirstTimeRef.current = true;
    }

    previousNodeRef.current = node;
    soundDurationMsRef.current = getSoundDurationMs(node.data.sound.hz);
    numberOfPressesRef.current = 0;
    timerMsRef.current = 0;
    reactionTimeMsRef.current = null;
    successRef.current = false;
    preDelayMsRef.current = prevSuccessRef.current ? node.data.preDelayMs : 0;

    let soundHasBeenPlayed = false;
    const intervalSpeedMs = 1;
    const startTimeMs = new Date().getTime();

    intervalIdRef.current = setInterval(() => {
      timerMsRef.current = new Date().getTime() - startTimeMs;

      if (!soundHasBeenPlayed && timerMsRef.current > preDelayMsRef.current) {
        soundHasBeenPlayed = true;
        playSound(node.data);
      }

      if (
        timerMsRef.current >
        preDelayMsRef.current + soundDurationMsRef.current + postDelayMs
      ) {
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        nodeFinished();
      }
    }, intervalSpeedMs);
  };

  const registerPress = () => {
    numberOfPressesRef.current += 1;

    if (
      !successRef.current &&
      timerMsRef.current > preDelayMsRef.current &&
      timerMsRef.current <
        preDelayMsRef.current + soundDurationMsRef.current + postDelayMs
    ) {
      successRef.current = true;
      reactionTimeMsRef.current = timerMsRef.current - preDelayMsRef.current;
    }
  };

  const nodeFinished = async () => {
    // The first node in a sub-test is replayed if not registered as a success
    // We only update the progress bar when moving on to the next node
    if (successRef.current || !isPlayingFirstNodeFirstTimeRef.current) {
      setNumberOfNodesPlayed(
        (prevNumberOfNodesPlayed) => prevNumberOfNodesPlayed + 1
      );
    }

    const payload = {
      isPlayingFirstNodeFirstTime: isPlayingFirstNodeFirstTimeRef.current,
      numberOfClicks: numberOfPressesRef.current,
      reactionTimeMs: reactionTimeMsRef.current,
      success: successRef.current,
      systemVolume: await SystemSetting.getVolume(),
    };

    if (isPlayingFirstNodeFirstTimeRef.current) {
      isPlayingFirstNodeFirstTimeRef.current = false;
    }

    prevSuccessRef.current = successRef.current;

    if (successRef.current) {
      dispatch(actionSuccess(payload));
    } else {
      dispatch(actionFailure(payload));
    }
  };

  const startTest = () => {
    dispatch(actionStartTest());
  };

  const continueTest = () => {
    dispatch(actionContinueTest());
    setDialog(DIALOG.HIDDEN);
  };

  const restartTest = () => {
    dispatch(actionResetTestState());
    navigation.replace("TestRoute");
  };

  const isLoading =
    isFetching || !isSoundsLoaded || pauseAfterNode || isDialogOpen;

  const showOfflineCard =
    isConnected === false && Object.keys(test).length === 0;

  return {
    continueTest,
    isDialogOpen,
    isLoading,
    pauseAfterNode,
    progress,
    registerPress,
    restartTest,
    setDialog,
    setPauseAfterNode,
    showOfflineCard,
    startTest,
    testIsRunning,
  };
};
