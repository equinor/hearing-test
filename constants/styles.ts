import { EDSStyleSheet } from "@equinor/mad-components";

export const commonStyles = EDSStyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.container.paddingHorizontal,
    paddingVertical: theme.spacing.container.paddingVertical,
  },
  h2: {
    color: theme.colors.interactive.primary,
  },
  equinor: {
    mossGreen: theme.colors.interactive.primary,
  },
}));
