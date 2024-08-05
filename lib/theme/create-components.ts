"use client";

import { paperClasses } from "@mui/material";

import { Components, createTheme } from "@mui/material/styles";
import { TubitakPalette } from "./create-palette";

export const muiTheme = createTheme();

export function createComponents(config: TubitakPalette): Components {
  const palette = config;
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          padding: 10,
          [`&.${paperClasses.elevation1}`]: {
            boxShadow:
            "0px 5px 22px rgba(0, 0, 0, 0.15), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            bgcolor: "transparent",
            color: "blue",
            '& .MuiSvgIcon-root': {
              color: "#2e7d32",
            },
          },
          '&:active': {
            transform: "scale(0.95)",
          }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          textTransform: "none",
          color: "black",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          backgroundColor: "white"
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
  };
}