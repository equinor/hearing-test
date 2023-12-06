import { LinearProgress, LinearProgressProps } from "@equinor/mad-components";

import { useTimer } from "../../../hooks/useTimer";

type ProgressBarProps = Pick<LinearProgressProps, "style"> & {
  dependencyToResetProgressBar: unknown;
  disabled: boolean;
  duration: number;
  timeout: number;
};

export const ProgressBar = ({
  dependencyToResetProgressBar,
  disabled,
  duration,
  timeout,
  style,
}: ProgressBarProps) => {
  const { timer } = useTimer(
    dependencyToResetProgressBar,
    disabled,
    duration,
    timeout
  );

  return (
    <LinearProgress
      value={timer / duration}
      style={[style, { opacity: disabled ? 0 : 1 }]}
    />
  );
};
