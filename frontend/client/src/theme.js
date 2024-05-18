import { useMemo } from "react"
import { createTheme } from "@mui/material/styles"
// import { typography } from "@mui/system";

export const tokens = {
    primary: {
          100: "#d6d7d7",
          200: "#adafaf",
          300: "#838887",
          400: "#5a605f",
          500: "#313837",
          600: "#272d2c",
          700: "#1d2221",
          800: "#141616",
          900: "#0a0b0b"
    },
    blueAccent: {
          100: "#d9e9e5",
          200: "#b3d3cb",
          300: "#8dbdb2",
          400: "#67a798",
          500: "#41917e",
          600: "#347465",
          700: "#27574c",
          800: "#1a3a32",
          900: "#0d1d19"
    },
    grayAccent: {
          100: "#ecf5ef",
          200: "#d9ebe0",
          300: "#c7e1d0",
          400: "#b4d7c1",
          500: "#a1cdb1",
          600: "#81a48e",
          700: "#617b6a",
          800: "#405247",
          900: "#202923"
    },
    yellowAccent: {
          100: "#f4f5e9",
          200: "#eaecd3",
          300: "#dfe2be",
          400: "#d5d9a8",
          500: "#cacf92",
          600: "#a2a675",
          700: "#797c58",
          800: "#51533a",
          900: "#28291d"
    },
    tanAccent: {
    100: "#fefdf4",
    200: "#fcfbea",
    300: "#fbf8df",
    400: "#f9f6d5",
    500: "#f8f4ca",
    600: "#c6c3a2",
    700: "#959279",
    800: "#636251",
    900: "#323128"
    }
}

export const themeSettings = () => {
    const colors = tokens;

    return {
        palette: {
            primary: {
                main: colors.primary[500]
            },
            secondary: {
                main: colors.blueAccent[500]
            },
            neutral: {
                dark: colors.tanAccent[700],
                main: colors.tanAccent[500],
                light:colors.tanAccent[100]
            },
            background: {
                default: colors.primary[500]
            }
        },
        typography : {
            fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(","),
                fontSize: 14,
            }
        }
    } 
};

//context for color
export const useCustomTheme = () => {
    const theme = useMemo(() => createTheme(themeSettings()),[]);

    return theme
}