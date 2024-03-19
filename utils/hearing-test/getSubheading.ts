export const SUBHEADINGS = {
  LOADING: "",
  TEST_IS_RUNNING: "Trykk på sirkelen under når du hører en lyd",
  TEST_HAS_LOADED:
    "Trykk på sirkelen under når du er klar for å starte hørselstesten.",
} as const;

export const getSubheading = (isLoading: boolean, isTestRunning: boolean) => {
  if (isLoading) return SUBHEADINGS.LOADING;
  if (isTestRunning) return SUBHEADINGS.TEST_IS_RUNNING;
  return SUBHEADINGS.TEST_HAS_LOADED;
};
