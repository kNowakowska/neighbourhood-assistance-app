import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Post from "../pages/Post";
import NewPost from "../pages/NewPost";
import { categories } from "../utils";

export const pages = [
  {
    path: "/home",
    sidebarName_en: "Home",
    sidebarName_pl: "Główna",
    icon: "home",
    children: categories.map((cat) => ({ path: `/home/${cat.id}`, sidebarName_en: cat.name_en, sidebarName_pl: cat.name_pl })),
  },
  { path: "/create_post", sidebarName_en: "New post", sidebarName_pl: "Nowy post", icon: "post_add" },
  { path: "/profile/1", sidebarName_en: "Profile", sidebarName_pl: "Profil", icon: "person" },
];

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="sign_up" element={<SignUp />} />
      <Route path="home" element={<Home />}>
        <Route path=":category" element={<Home />} />
      </Route>
      <Route path="posts/:id" element={<Post />} />
      <Route path="profile/:id" element={<Profile />} />
      <Route path="create_post" element={<NewPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
