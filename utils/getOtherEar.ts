import { Ear } from "../types";

export const getOtherEar = (ear: Ear): Ear =>
  ear === "left" ? "right" : "left";
