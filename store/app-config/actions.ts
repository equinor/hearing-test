import { createAction } from "@reduxjs/toolkit";

export const setConfig = createAction<{ key: string; value: any }>(
  "AppConfig/SET"
);
