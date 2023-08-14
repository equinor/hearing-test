import { EDSStyleSheet } from "@equinor/mad-components";

export const commonStyles = EDSStyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.container.paddingHorizontal,
    paddingVertical: theme.spacing.container.paddingVertical,
  },
  roundButton: {
    buttonDiameter: 241,
    borderColor: theme.colors.interactive.primary,
    secondaryBorderColor: theme.colors.interactive.secondary,
    backgroundColor: theme.colors.interactive.primary,
    secondaryBackgroundColor: theme.colors.container.background,
    borderWidth: 0,
    secondaryBorderWidth: 1,
    textColor: theme.colors.text.primaryInverted,
    secondaryTextColor: theme.colors.text.secondary,
    disabledBackgroundColor: theme.colors.interactive.disabled,
    disabledTextColor: theme.colors.text.disabled,
  },
  h2: {
    color: theme.colors.interactive.primary,
  },
  equinor: {
    mossGreen: theme.colors.interactive.primary,
  },
}));
