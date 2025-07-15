import type { APPSTATE } from "../config/constants";

export type TLikertScaleValues = {
  stronglyDisagree: number;
  disagree: number;
  neutral: number;
  agree: number;
  stronglyAgree: number;
};

export type TLikertScaleMark = {
  value: number;
  label: string; // Translation key
};

export const likertScaleValues: TLikertScaleValues = {
  stronglyDisagree: -2,
  disagree: -1,
  neutral: 0,
  agree: 1,
  stronglyAgree: 2,
};

export const likertScaleMarks: TLikertScaleMark[] = Object.entries(
  likertScaleValues
).map(([key, value]) => ({
  value,
  label: `likertScale.${key}`, // Translation key
}));

export type AppState = (typeof APPSTATE)[keyof typeof APPSTATE];
