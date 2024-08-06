import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (option) => {
    handleMenuClose();
    switch (option) {
      case 'My Profile':
        navigate('/profile');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      case 'Logout':
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user_name');
        navigate('/');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Cookies?
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user_name');
    navigate('/');
  }

  return (
    <div>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuClick('My Profile')}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick('Settings')}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
