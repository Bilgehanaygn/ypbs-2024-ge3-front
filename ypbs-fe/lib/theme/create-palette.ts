import { common } from "@mui/material/colors";
import { alpha, PaletteOptions } from "@mui/material/styles";
import { error, neutral, success } from "./colors";
import { Color } from "@mui/material";

export interface TubitakPalette extends PaletteOptions {
  neutral: Color;
}
export function createPalette(): TubitakPalette {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: common.white,
      paper: common.white,
    },
    error,
    mode: "light",
    neutral,
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
  };
}
