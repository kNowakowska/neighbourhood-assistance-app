import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

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

import { pages } from "./routes/Routes";

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

const NavigationBar = (props) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  const activeRoute = (routeName) => {
    return location.pathname === routeName;
  };

  const generateMenuList = (pages) => {
    const menu = [];
    const submenu = [];

    pages.forEach(({children, path, sidebarName, icon}, key) => {
      if (!children) {
        menu.push(
          <StyledNavLink to={path} key={key}>
            <MenuItem selected={activeRoute(path)}>
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={sidebarName} />
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
              <ListItemText primary={sidebarName} />
            </MenuItem>
          </StyledNavLink>
        );
        children.forEach((child, key) => {
          submenu.push(
            <StyledNavLink to={child.path} key={`${key}_${child.path}`}>
              <MenuItem selected={activeRoute(child.path)}>
                <ListItemText primary={child.sidebarName} />
              </MenuItem>
            </StyledNavLink>
          );
        });
        menu.push(<MenuList sx={{ ml: 3 }} key={`submenu_${path}`}>{submenu}</MenuList>);
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
          </Toolbar>
        </AppBar>
      </div>
      <StyledDrawer open={isOpen} onClose={toggleDrawer(false)}>
        <div role="presentation" onClick={toggleDrawer(false)}>
          <MenuList>{generateMenuList(pages)}</MenuList>
        </div>
      </StyledDrawer>
    </div>
  );
};

export default NavigationBar;
