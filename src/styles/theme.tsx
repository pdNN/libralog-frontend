import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const headerHeight = "65px";
export const sidebarWidth = "240px";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#4995c1",
      main: "#1C7BB2",
      dark: "#13567c",
      contrastText: "#f8f8f8",
    },
    secondary: {
      light: "#e0505c",
      main: "#D92534",
      dark: "#971924",
      contrastText: "#f8f8f8",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        sx: {
          bgcolor: (props) => props.palette.background.default,
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        sx: {
          color: (props) => props.palette.primary.main,
        },
      },
    },
  },
});

export default theme;
