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
          borderBottom: '5px solid red', // Add a red border only at the bottom
          [`&.${paperClasses.elevation1}`]: {
            boxShadow:
                "0px 5px 15px rgba(0, 0, 0, 0.1), 0px 3px 8px rgba(0, 0, 0, 0.08), 0px 0px 10px rgba(0, 0, 0, 0.04)",
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