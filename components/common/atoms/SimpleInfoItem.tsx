import { Typography } from "@equinor/mad-components";

export type SimpleItem = {
  label: string;
  text: string;
};

type SimpleInfoItemProps = {
  item: SimpleItem;
};

export const SimpleInfoItem = ({
  item: { label, text },
}: SimpleInfoItemProps) => (
  <>
    <Typography italic>{label}</Typography>
    <Typography>{text}</Typography>
  </>
);
