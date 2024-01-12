/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  LoginRoute: undefined;
  ReleaseNoteRoute: undefined;
  Root: undefined;
  SoundCheckRoute: undefined;
  SoundCheckFinishedRoute: undefined;
  PreTestRoute: undefined;
  TestRoute: undefined;
  TestResultRoute: undefined;
  Settings: undefined;
  AboutRoute: undefined;
  FeedbackRoute: undefined;
  NotFoundRoute: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export const stateKeys = {
  MANIFEST: "schemaVersion",
  TEST: "test",
  TESTS: "tests",
  UNSENTTESTS: "unsentTests",
};

export type TestResult = {
  id: string;
  userId: string;
  name: string;
  dateTaken: ISOString;
  level: Level;
  result: AnalysisFlag;
};

export type ISOString =
  `${number}-${number}-${number}T${number}:${number}:${number}.${number}+${number}:${number}`;

export type Level = {
  leftEar: HearingLevel[];
  rightEar: HearingLevel[];
};

export type HearingLevel = {
  id: string;
  hz: number;
  db: number;
};

export const ANALYSIS_FLAG = {
  UNDEFINED: "Undefined",
  OK: "Ok",
  OUTLIER: "Outlier",
  NOT_OK: "NotOk",
  SEND_FAILED: "SendFailed",
} as const;

type ObjectValues<T> = T[keyof T];

export type AnalysisFlag = ObjectValues<typeof ANALYSIS_FLAG>;

export type ChartData = {
  leftEar: Point[];
  rightEar: Point[];
};

export type Point = {
  x: number;
  y: number;
};

export const HEARING_THRESHOLD = {
  NORMAL: 20,
  MILD_LOSS: 40,
  MODERATE_LOSS: 70,
  CONSIDERABLE_LOSS: 90,
  SERIOUS_LOSS: 120,
} as const;

export type Ear = "left" | "right";

export const CHART = {
  HZ_MIN: 400,
  HZ_MAX: 10000,
  DB_MIN: -10,
  DB_MAX: 120,
} as const;

export type SoundCheckPageJSON = {
  title: string;
  description: string;
  button: "variant1" | "variant2";
  hearNoSoundButtonVisible: boolean;
  sound: {
    play: boolean;
    ear?: "left" | "right";
  };
};

export type MaterialCommunityIconName =
  keyof typeof MaterialCommunityIcons.glyphMap;

export type Error = { message: string | null; status: number | null };

export type User = {
  id: string;
  firstName: string;
  surName: string;
  email: string;
  location: string;
  jobTitle: string;
};

export type URL = `${string}://${string}.${string}`;

export type Sound = {
  name: string;
  hz: number;
  uri: string;
  lastModified: Date;
};
