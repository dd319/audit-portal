import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img src="path_to_logo" alt="Dataflow Group Logo" style={{ height: '40px', marginRight: '10px' }} />
          Audit Portal
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
