import { Ear } from "../types";

export const getEarName = (ear: Ear) => (ear === "left" ? "venstre" : "høyre");
