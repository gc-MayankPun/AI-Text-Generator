import { v4 as uuidv4 } from "uuid";

export const generateRandomID = (prefix = "") =>
  `${prefix}${uuidv4().replace(/-/g, "")}`;
