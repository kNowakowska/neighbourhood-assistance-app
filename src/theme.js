import { createTheme } from "@mui/material";

const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "rgba(187,147,160,0.89)",
    },
    secondary: {
      main: "#8e5767",
    },
    background: {
      default: "#122639",
      //paper: "rgba(71,101,127,0.45)",
      paper: "rgb(71,101,127)",
    },
    text: {
      primary: "#f1e6e6",
      secondary: "rgba(255,255,255,0.81)",
    },
    error: {
      main: "#983c35",
    },
  },
  typography: {
    fontFamily: ["Mukta"],
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@font-face { font-family: 'Mukta'; }`,
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
