import { TestScreenComponent } from "./TestScreenComponent";
import { VolumeProvider } from "../../contexts/VolumeContext";

export const TestScreen = () => (
  <VolumeProvider>
    <TestScreenComponent />
  </VolumeProvider>
);
