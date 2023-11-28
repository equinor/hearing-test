# Molecule

A Molecule is a re-usable component composed of other [atoms](../atoms/README.md), it is more complex then an atom and can be a wrapper for child components.

Internal state usage is discouraged, but can be used when needed.

Use the following component format

```tsx
import { Typography } from "@equinor/mad-components";
import { ReactNode } from "react";
import { View } from "react-native";

type MyMoleculeComponentProps = {
  title: string;
  children: ReactNode;
};

export const MyMoleculeComponent = ({
  title,
  children,
}: MyMoleculeComponentProps) => (
  <View>
    <Typography>{title}</Typography>
    {children}
  </View>
);
```
