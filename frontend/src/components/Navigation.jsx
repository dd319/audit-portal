


import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Badge, Typography, AppBar, Toolbar, Tooltip, Menu, MenuItem, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchBar from './SearchBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../css/styles.css';
import Cookies from 'js-cookie';
import '../css/styles.css';





const Navigation = ({ userRole, draftsCount, toggleTheme }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Drafts', icon: <DraftsIcon />, route: '/drafts', showBadge: true },
    { text: 'Submitted', icon: <SendIcon />, route: '/submitted' },
    { text: 'Admin Panel', icon: <AdminPanelSettingsIcon />, route: '/admin-panel', adminOnly: true },
    { text: 'Audit Query Portal', icon: <QueryBuilderIcon />, route: '/audit-query-portal' },
    { text: 'Audit Sampling', icon: <AssessmentIcon />, route: '/audit-sampling' },
    { text: 'Configuration', icon: <CrisisAlertIcon />, route: '/configuration' },
    { text: 'Back To Form', icon: <ArrowBackIcon />, route: '/landing' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  // const handleLogout = () => {
  //   navigate('/');
  // };

  const handleLogout = () => {
    // Cookies?
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user_name');
    navigate('/');
  }

  return (
    <AppBar position="static" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <Toolbar>
        <img src="/DFLogo.png" alt="Dataflow Group" style={{ height: '40px', marginRight: '16px' }} />
        <Typography variant="h6" style={{ flexGrow: 1,color:'black' }}>
    
        </Typography>
        <SearchBar />
        <IconButton color="black" onClick={toggleTheme}>
          {/* <DarkModeIcon /> */}
        </IconButton>
        <Tooltip title="Notifications">
          <IconButton color="black">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Help">
          <IconButton color="black">
            <HelpIcon />
          </IconButton>
        </Tooltip>
        <IconButton onClick={handleProfileMenuOpen} color="black">
          <Avatar alt="User Name" src="/profile-pic.jpg" />
        </IconButton>
        <Menu
          anchorEl={profileMenuAnchorEl}
          open={Boolean(profileMenuAnchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <IconButton onClick={toggleDrawer(true)} edge="end" color="black">
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => {
            if (item.adminOnly && userRole !== 'admin') {
              return null;
            }
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => { navigate(item.route); setDrawerOpen(false); }}
                selected={location.pathname === item.route}
              >
                <ListItemIcon>
                  {item.showBadge ? (
                    <Badge  color="primary">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navigation;