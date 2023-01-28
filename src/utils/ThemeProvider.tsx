import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7a21ab",
    },
    secondary: {
      main: "#1976d2",
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
