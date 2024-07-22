'use client';

import { paperClasses } from "@mui/material";

import { Components, createTheme } from "@mui/material/styles";
import{TubitakPalette} from "./create-palette";
import { SimplePaletteColorOptions } from "@mui/material/styles/createPalette";




export const muiTheme = createTheme();

export function createComponents(config: TubitakPalette): Components{
    const palette = config;
    return{
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    [`&.${paperClasses.elevation1}`]: {
                        boxShadow: "0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)"
                    }
                }
            }
        }
}};
