// src/pages/Unauthorized.jsx
/*
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const UnauthorizedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
  animation: 'fadeIn 1s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const MessageBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  animation: 'slideIn 1s ease-in-out',
  '@keyframes slideIn': {
    '0%': { transform: 'translateY(-50px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
}));

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleReturnToLogin = () => {
    navigate('/');
  };

  return (
    <UnauthorizedContainer>
      <MessageBox>
        <Typography variant="h4" gutterBottom>
          Oops! You don't have access.
        </Typography>
        <Typography variant="body1" gutterBottom>
          It looks like you're trying to access a page you don't have permissions for.
        </Typography>
        <Typography variant="body2">
          Please login again or contact the administrator if you believe this is a mistake.
        </Typography>
      </MessageBox>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleReturnToLogin}
        sx={{ background: '#DA5527' }}
      >
        Return to Login
      </Button>
    </UnauthorizedContainer>
  );
};

export default Unauthorized;  */

// src/pages/Unauthorized.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import '../css/styles.css';

const UnauthorizedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
  animation: 'fadeIn 1s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const MessageBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  animation: 'slideIn 1s ease-in-out',
  '@keyframes slideIn': {
    '0%': { transform: 'translateY(-50px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
}));

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleReturnToLogin = () => {
    navigate('/');
  };

  return (
    <UnauthorizedContainer>
      <MessageBox>
        <Typography variant="h4" gutterBottom>
          Oops! You don't have access.
        </Typography>
        <Typography variant="body1" gutterBottom>
          It looks like you're trying to access a page you don't have permissions for.
        </Typography>
        <Typography variant="body2">
          Please login again or contact the administrator if you believe this is a mistake.
        </Typography>
      </MessageBox>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleReturnToLogin}
        sx={{ background: '#DA5527' }}
      >
        Return to Login
      </Button>
    </UnauthorizedContainer>
  );
};

export default Unauthorized;
