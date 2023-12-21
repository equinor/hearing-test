import { Ear, Pan } from "../types";

export const getPan = (ear: Ear): Pan => (ear === "left" ? -1 : 1);
