import { addTelemetryInitializer, Envelope } from "@equinor/mad-core";
import { useEffect, useState } from "react";

import AppInfo from "../app.json";

export const useTelemetryInitializer = () => {
  const [isTelemetryInitialized, setIsTelemetryInitialized] = useState(false);

  useEffect(() => {
    const appVersionEnvelope: Envelope = (item) => {
      if (item.data) {
        item.data["app-version"] = AppInfo.expo.version;
      }
    };
    addTelemetryInitializer(appVersionEnvelope);
    setIsTelemetryInitialized(true);
  }, []);

  return { isTelemetryInitialized };
};
