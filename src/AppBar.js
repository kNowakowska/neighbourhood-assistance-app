import React, { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";
import {Routes, pages} from "./routes/Routes";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, IconButton, Drawer, MenuList, MenuItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Icon from '@mui/material/Icon';


const NavigationBar = (props) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? true : false;
  };

  return (
    <div>
      <div
        sx={{
          // flexGrow: 1,
          display: "block"
        }}
      >
        <AppBar position="fixed" enableColorOnDark color="secondary">
          <Toolbar>
             <IconButton
              edge="start"
              sx={{
                mr: 2,
                color: '#f1e6e6',

              }}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                color: '#f1e6e6',
                textTransform: "uppercase",
                fontSize: "22px",
                letterSpacing: "1px"
              }}
            >
              Neighbourhood Assistance
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            backgroundColor: 'rgb(71,101,127)',
            pt: 5
          },
        }}
        open={isOpen}
        onClose={toggleDrawer(false)}
        
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
      >
          <MenuList>
            {pages.map((prop, key) => {
              return (
                <NavLink to={prop.path} style={{ textDecoration: "none", color: '#f1e6e6'}}  key={key}>
                  <MenuItem selected={activeRoute(prop.path)} >
                  <ListItemIcon>
                    <Icon>{prop.icon}</Icon>
                  </ListItemIcon>
                    <ListItemText primary={prop.sidebarName} />
                  </MenuItem>
                </NavLink>
              );
            })}
          </MenuList>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationBar;