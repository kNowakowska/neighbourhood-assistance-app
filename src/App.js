import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";

import { MyRoutes as Routes } from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes />
    </div>
  );
}

export default App;
