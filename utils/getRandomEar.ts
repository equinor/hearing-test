import { Ear } from "../types";

export const getRandomEar = (): Ear => (Math.random() < 0.5 ? "left" : "right");
