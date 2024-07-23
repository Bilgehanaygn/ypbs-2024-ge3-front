import { createTheme as createMuiTheme } from "@mui/material/styles";
import { createComponents } from "./create-components";
import { createPalette } from "./create-palette";
import { createShadows } from "./create-shadows";
import { createTypography } from "./create-typography";

export function createTheme() {
  const palette = createPalette();
  const components = createComponents(palette);
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    components,
    palette,
    shadows,
    typography,
    shape: {
      borderRadius: 8,
    },
  });
}

export type Theme = ReturnType<typeof createTheme>;
export * from "./styles";
