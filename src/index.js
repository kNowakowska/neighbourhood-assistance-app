import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { ConfirmProvider } from "material-ui-confirm";
import "./i18n";

const store = configureStore({
  reducer: {},
});

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ConfirmProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ConfirmProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
