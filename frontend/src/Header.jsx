// import { Typography, Box } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import logo from './logo.jpg';
// import { Link } from 'react-router-dom';
// import CustomButton from './CustomButton';

// const Header = () => {
//   const [name, setName] = useState('');

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/auth/google/')
//       .then((response) => {
//         // Extract name from response data
//         if (response.data && response.data.name) {
//           setName(response.data.name);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <>
//       <Box sx={{ margin: '20px' }}>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <Box>
//             <img
//               src={logo}
//               alt="Logo"
//               style={{ height: 40 }}
//             />
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Box sx={{ marginRight: '16px' }}>
//               Hi, {name ? name : 'Guest'}
//             </Box>
//             <CustomButton>
//               <Link
//                 to="/"
//                 style={{
//                   textDecoration: 'none',
//                   color: '#d9531e',
//                   fontWeight: 'bold',
//                 }}
//                 onMouseOver={(e) => e.currentTarget.style.color = 'white'}
//                 onMouseOut={(e) => e.currentTarget.style.color = '#d9531e'}
//               >
//                 LOG OUT
//               </Link>
//             </CustomButton>
//           </Box>
//         </Box>
//       </Box>

//       <Typography
//         variant="h3"
//         sx={{ color: '#D9531E', textAlign: 'center', padding: '20px 0' }}
//       >
//         Audit Portal
//       </Typography>
//     </>
//   );
// };

// export default Header;















// import { Typography, Box } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import logo from './logo.jpg';
// import { Link } from 'react-router-dom';
// import CustomButton from './CustomButton';

// const Header = () => {
//   const [name, setName] = useState('');
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     // Retrieve name from localStorage
//     const storedName = localStorage.getItem('user_name');
//     setName(storedName || '');

//     // Decode access token to get user ID
//     const accessToken = localStorage.getItem('access_token');
//     if (accessToken) {
//       const payload = JSON.parse(atob(accessToken.split('.')[1]));
//       setUserId(payload.sub || ''); // 'sub' is usually the user ID in JWT
//     }
//   }, []);

//   return (
//     <>
//       <Box sx={{ margin: '20px' }}>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <Box>
//             <img
//               src={logo}
//               alt="Logo"
//               style={{ height: 40 }}
//             />
//           </Box>


//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Box sx={{ marginRight: '16px' }}>
//               Hi, {name ? name : 'Guest'}
//             </Box>
//             <CustomButton>
//               <Link
//                 to="/"
//                 style={{
//                   textDecoration: 'none',
//                   color: '#d9531e',
//                   fontWeight: 'bold',
//                 }}
//                 onMouseOver={(e) => e.currentTarget.style.color = 'white'}
//                 onMouseOut={(e) => e.currentTarget.style.color = '#d9531e'}
//               >
//                 LOG OUT
//               </Link>
//             </CustomButton>
//           </Box>
//         </Box>
//       </Box>

//     </>
//   );
// };

// export default Header;





import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    setName(storedName || '');

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      setUserId(payload.sub || '');
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleProfileMenuOpen = (event) => {
  //   setProfileAnchorEl(event.currentTarget);
  // };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name');
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={`${process.env.PUBLIC_URL}/DFlogoFull.png`} alt="DataFlow Logo" style={{ height: 40 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '10px', color: '#DA5527' }}>
            Audit Portal
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/drafts">
              Drafts
            </Button>
            <Button color="inherit" component={Link} to="/submitted">
              Submitted
            </Button>
            <Button color="inherit" component={Link} to="/audit-query-portal">
              Audit Query Portal
            </Button>
            <Button color="inherit" component={Link} to="/admin-panel">
              Admin Panel
            </Button>
            <Button color="inherit" component={Link} to="/audit-sampling">
              Audit Sampling
            </Button>
            <Button color="inherit" component={Link} to="/configurationcasestatus">
              Configuration
            </Button>
          </Box>

          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { xs: 'flex', md: 'none' } }} onClick={handleMenuOpen}>
            {/* <MenuIcon /> */}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuItem component={Link} to="/drafts" onClick={handleMenuClose}>Drafts</MenuItem>
            <MenuItem component={Link} to="/submitted" onClick={handleMenuClose}>Submitted</MenuItem>
            <MenuItem component={Link} to="/audit-query-portal" onClick={handleMenuClose}>Audit Query Portal</MenuItem>
            <MenuItem component={Link} to="/admin-panel" onClick={handleMenuClose}>Admin Panel</MenuItem>
            <MenuItem component={Link} to="/audit-sampling" onClick={handleMenuClose}>Audit Sampling</MenuItem>
            <MenuItem component={Link} to="/configuration" onClick={handleMenuClose}>Configuration</MenuItem>
          </Menu>

          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            {/* <div style={{ position: 'relative' }}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </div>
            <div style={{ position: 'relative' }}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div> */}

            <Menu
              anchorEl={profileAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <Typography variant="body1" sx={{ marginRight: '16px' }}>
              Hi, {name ? name : 'Guest'}
            </Typography>

            <Button
              variant="outlined"
              component={Link}
              to="/"
              sx={{
                color: '#DA5527',
                borderColor: '#DA5527',
                '&:hover': {
                  backgroundColor: '#DA5527',
                  color: 'white',
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;