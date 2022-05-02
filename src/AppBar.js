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

  return (
    <div>
      <div
        style={{
          display: "block",
        }}
      >
        <AppBar position="fixed" enableColorOnDark color="secondary">
          <Toolbar>
            <StyledMenuButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{  mr: 2,}}>
              <MenuIcon />
            </StyledMenuButton>
            <StyledAppTitle variant="h6">Neighbourhood Assistance</StyledAppTitle>
          </Toolbar>
        </AppBar>
      </div>
      <StyledDrawer open={isOpen} onClose={toggleDrawer(false)}>
        <div role="presentation" onClick={toggleDrawer(false)}>
          <MenuList>
            {pages.map((prop, key) => {
              return (
                <StyledNavLink to={prop.path} key={key}>
                  <MenuItem selected={activeRoute(prop.path)}>
                    <ListItemIcon>
                      <Icon>{prop.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={prop.sidebarName} />
                  </MenuItem>
                </StyledNavLink>
              );
            })}
          </MenuList>
        </div>
      </StyledDrawer>
    </div>
  );
};

export default NavigationBar;
