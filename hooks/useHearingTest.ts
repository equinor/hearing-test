import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from "react";
import SystemSetting from "react-native-system-setting";
import { useDispatch, useSelector } from "react-redux";

import { useHearingNavigation } from "./useHearingNavigation";
import { useHearingTestIsFinished } from "./useHearingTestIsFinished";
import { useHearingTestProgress } from "./useHearingTestProgress";
import { useHearingTestSoundFiles } from "./useHearingTestSoundFiles";
import {
  postTakeTest as actionPostTakeTest,
  success as actionSuccess,
  stopTest as actionStopTest,
  failure as actionFailure,
  startTest as actionStartTest,
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
  const { isSoundFilesLoaded, getSoundDuration, playSound } =
    useHearingTestSoundFiles();
  useHearingTestIsFinished();

  useEffect(() => {
    if (isConnected && !isFetching && Object.keys(test).length === 0) {
      dispatch(actionPostTakeTest());
    }
  }, [isConnected, isFetching, test]);

  useEffect(() => {
    if (
      pauseAfterNode &&
      dialog === DIALOG.HIDDEN &&
      previousNodeRef.current !== node
    ) {
      setPauseAfterNode(false);
      setDialog(DIALOG.OPEN);
    }
  }, [pauseAfterNode, dialog, node]);

  useEffect(() => {
    if (
      !testIsRunning ||
      pauseAfterNode ||
      dialog === DIALOG.OPEN ||
      dialog === DIALOG.SUBDIALOG
    ) {
      return;
    }

    runNode();
  }, [testIsRunning, pauseAfterNode, dialog, node]);

  const runNode = () => {
    if (previousNodeRef.current?.data.index !== 1 && node.data.index === 1) {
      isPlayingFirstNodeFirstTimeRef.current = true;
    }

    previousNodeRef.current = node;
    soundDurationMsRef.current = getSoundDuration(node.data.sound.hz);
    numberOfPressesRef.current = 0;
    timerMsRef.current = 0;
    reactionTimeMsRef.current = null;
    successRef.current = false;
    preDelayMsRef.current = prevSuccessRef.current ? node.data.preDelayMs : 0;

    let soundHasBeenPlayed = false;
    const intervalSpeedMs = 1;
    const startTimeMs = new Date().getTime();

    intervalIdRef.current = setInterval(() => {
      if (!soundHasBeenPlayed && timerMsRef.current > preDelayMsRef.current) {
        soundHasBeenPlayed = true;
        playSound(node.data);
      }

      if (
        timerMsRef.current <
        preDelayMsRef.current + soundDurationMsRef.current + postDelayMs
      ) {
        timerMsRef.current = new Date().getTime() - startTimeMs;
      } else {
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

  const stopTest = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    dispatch(actionStopTest());
    setDialog(DIALOG.HIDDEN);
    setNumberOfNodesPlayed(0);
  };

  const restartTest = () => {
    stopTest();
    dispatch(actionStartTest());
    navigation.navigate("TestRoute");
  };

  console.log({
    isFetching,
    isSoundFilesLoaded,
    pauseAfterNode,
    dialog,
  });

  const isLoading =
    isFetching ||
    !isSoundFilesLoaded ||
    pauseAfterNode ||
    dialog === DIALOG.OPEN ||
    dialog === DIALOG.SUBDIALOG;

  const showOfflineCard =
    isConnected === false && Object.keys(test).length === 0;

  return {
    dialog,
    isLoading,
    pauseAfterNode,
    progress,
    registerPress,
    restartTest,
    setDialog,
    setPauseAfterNode,
    showOfflineCard,
    startTest,
    stopTest,
    testIsRunning,
  };
};
