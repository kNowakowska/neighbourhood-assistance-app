import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import { useRoutes, Route, Routes } from "react-router-dom";

export const pages = [
  {
    path: "/home",
    sidebarName: "Home",
    icon: "home"
  },
  { path: "/profile", sidebarName: "Profile", icon: "person" },
];



export function MyRoutes() {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/sign_up" element={<SignUp/>} />
       <Route path="/home" element={<Home />} />
       <Route path="/profile" element={<Profile/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
