import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from './AppBar';
import {MyRoutes} from "./routes/Routes"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home"


function App() {
  return (
    <div className="App">
     <CssBaseline />
      {/* <AppBar />  */}
     <MyRoutes/>
    </div>
  );
}

export default App;
