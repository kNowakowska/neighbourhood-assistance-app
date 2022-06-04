import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";

import { MyRoutes as Routes } from "./routes/Routes";
import { getCategories } from "./redux/actions/categories";
import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

function App({ getCategories }) {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="App">
      <CssBaseline />
      <Routes />
    </div>
  );
}

const mapDispatchToProps = {
  getCategories,
};

export default connect(null, mapDispatchToProps)(App);
