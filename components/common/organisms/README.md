# Organisms

An organism is a complex re-usable component, it can have its own internal state or be connected to an external store/reducer. This can also be used as a wrapper to connect molecules to redux with connect(). Organisms should only be made if you are ___really___ in need of them. If unsure start with a [molecule](../molecules/README.md) and wrap it in a organisms if there should be a need

Use the following component format

```tsx
import { Button, Typography } from "@equinor/mad-components";
import { useState } from "react";

type MyOrganismComponentProps = {
  initialCount: number;
};

export const MyOrganismComponent = ({
  initialCount,
}: MyOrganismComponentProps) => {
  const [count, setCount] = useState(initialCount);
  
  return (
    <>
      <Typography variant="h1">{`Count: ${count}`}</Typography>
      <Button title="Increase" onPress={() => setCount(count + 1)} />
      <Button title="Decrease" onPress={() => setCount(count - 1)} />
    </>
  );
};
```
