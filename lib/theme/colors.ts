import { alpha, PaletteColor } from "@mui/material/styles";
import { Color } from "@mui/material";
export interface TubitakColor extends PaletteColor {
  lightest: string;
  darkest: string;
  main: string;
}
const withAlphas = (color: TubitakColor) => {
  return {
    ...color,
  };
};
export const neutral = {
  50: "#FFEBEE", // Very light pink, close to white
  100: "#FFCDD2", // Light pink
  200: "#EF9A9A", // Light red
  300: "#E57373", // Soft red
  400: "#EF5350", // Medium red
  500: "#F44336", // Standard red
  600: "#E53935", // Slightly darker red
  700: "#D32F2F", // Dark red
  800: "#C62828", // Very dark red
  900: "#B71C1C", // Almost black red
} as Color;

export const success = withAlphas({
  lightest: "#F0FDF9",
  light: "#3FC79A",
  main: "#10B981",
  dark: "#0B815A",
  darkest: "#134E48",
  contrastText: "#FFFFFF",
});

export const error = withAlphas({
  lightest: "#FEF3F2",
  light: "#FEE4E2",
  main: "#F04438",
  dark: "#B42318",
  darkest: "#7A271A",
  contrastText: "#FFFFFF",
});
