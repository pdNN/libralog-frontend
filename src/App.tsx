import { FC, StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

// import './serviceWorker';
import theme from "styles/theme";

import AppProvider from "hooks";

import Routes from "routes";

const App: FC = () => {
  return (
    <StrictMode>
      <Router>
        <CssBaseline />
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <AppProvider>
            <Routes />
          </AppProvider>
        </ThemeProvider>
      </Router>
    </StrictMode>
  );
};

export default App;
