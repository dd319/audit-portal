import React from 'react';
import Box from '@mui/material/Box';

import GoogleLoginButton from '../components/GoogleLoginButton';
import { keyframes } from '@mui/system';

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const slideInAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(0); }
`;

const Login = () => {
  return (
    <Box sx={{display:'flex', alignItems:'center',justifyContent:'center',   height: '100vh'}}>
      {/* <Box
        component="div"
        sx={{
          background: `url(${process.env.PUBLIC_URL}/auditbg.svg) no-repeat center center`,
          backgroundSize: 'cover',
          flex: 1,
          height: '100%',
          display: { xs: 'none', md: 'block' },
          animation: `${slideInAnimation} 1s ease-out forwards`,
        }}
      /> */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: { xs: '100%', md: '400px' },
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/DFlogoFull.png`}
          alt="DataFlow Logo"
          sx={{ height: 60, marginBottom: 3 }}
        />
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/auditPortalLogo.svg`}
          alt="Audit Portal Logo"
          sx={{
            height: 120,
            marginBottom: 3,
            animation: `${rotateAnimation} 5s linear infinite`,
            borderRadius: '50%',
          }}
        />
       
        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
          <GoogleLoginButton />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;