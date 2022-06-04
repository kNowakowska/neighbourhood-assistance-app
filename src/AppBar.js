import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from "@mui/material/Icon";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";

import { logout } from "./redux/actions/system";

const StyledMenuButton = styled(IconButton)({
  color: "#f1e6e6",
});

const StyledAppTitle = styled(Typography)({
  flexGrow: 1,
  color: "#f1e6e6",
  textTransform: "uppercase",
  fontSize: "22px",
  letterSpacing: "1px",
});

const StyledDrawer = styled(Drawer)({
  width: 300,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 300,
    boxSizing: "border-box",
    backgroundColor: "rgb(71,101,127)",
    paddingTop: 40,
  },
});

const StyledNavLink = styled(NavLink)({
  textDecoration: "none",
  color: "#f1e6e6",
});

const NavigationBar = ({ categories, loggedUser, logout }) => {
  const { i18n, t } = useTranslation("core");
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const pages = [
    {
      path: "/home",
      sidebarName_en: "Home",
      sidebarName_pl: "Główna",
      icon: "home",
      children: categories.map((item) => ({
        path: `/home/${item.id}`,
        sidebarName_en: item.nameEng,
        sidebarName_pl: item.namePl,
      })),
    },
    { path: "/create_post", sidebarName_en: "New post", sidebarName_pl: "Nowy post", icon: "post_add" },
    { path: `/profile/${loggedUser.id}`, sidebarName_en: "Profile", sidebarName_pl: "Profil", icon: "person" },
  ];

  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  const activeRoute = (routeName) => {
    return location.pathname === routeName;
  };

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  const openProfile = () => {
    navigate(`/profile/${loggedUser.id}`);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("pl");
      localStorage.setItem("lng", "pl");
    } else {
      i18n.changeLanguage("en");
      localStorage.setItem("lng", "en");
    }
    setIsAlertOpen(true);
  };

  const generateMenuList = (pages) => {
    const menu = [];
    const submenu = [];

    pages.forEach(({ children, path, sidebarName_en, sidebarName_pl, icon }, key) => {
      if (!children) {
        menu.push(
          <StyledNavLink to={path} key={key}>
            <MenuItem selected={activeRoute(path)}>
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={i18n.language === "en" ? sidebarName_en : sidebarName_pl} />
            </MenuItem>
          </StyledNavLink>
        );
      } else {
        menu.push(
          <StyledNavLink to={path} key={key}>
            <MenuItem selected={activeRoute(path)}>
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={i18n.language === "en" ? sidebarName_en : sidebarName_pl} />
            </MenuItem>
          </StyledNavLink>
        );
        children.forEach((child, key) => {
          submenu.push(
            <StyledNavLink to={child.path} key={`${key}_${child.path}`}>
              <MenuItem selected={activeRoute(child.path)}>
                <ListItemText primary={i18n.language === "en" ? child.sidebarName_en : child.sidebarName_pl} />
              </MenuItem>
            </StyledNavLink>
          );
        });
        menu.push(
          <MenuList sx={{ ml: 3 }} key={`submenu_${path}`}>
            {submenu}
          </MenuList>
        );
      }
    });
    return menu;
  };

  return (
    <div>
      <div
        style={{
          display: "block",
        }}
      >
        <AppBar position="fixed" enableColorOnDark color="secondary">
          <Toolbar>
            <StyledMenuButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </StyledMenuButton>
            <StyledAppTitle variant="h6">Neighbourhood Assistance</StyledAppTitle>
            <IconButton onClick={changeLanguage}>
              <LanguageIcon />
            </IconButton>
            <IconButton onClick={openProfile} sx={{ marginLeft: 1 }}>
              <Avatar />
            </IconButton>
            <IconButton onClick={logoutUser} sx={{ marginLeft: 1 }}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <StyledDrawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div role="presentation" onClick={toggleDrawer(false)}>
          <MenuList>{generateMenuList(pages)}</MenuList>
        </div>
      </StyledDrawer>
      <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
          {t("toasts.changeLang")}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  loggedUser: state.system,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
