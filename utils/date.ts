import { ISOString } from "../types";

export const formatDate = (date: ISOString) => {
  return new Date(date).toLocaleDateString("nb-NO", {
    month: "short",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
