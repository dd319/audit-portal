// CustomButton.js
import React from 'react';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';

const CustomButton = ({ children, onClick, type = "button" }) => {
  return (
    <Button
      sx={{
        backgroundColor: 'white',
        color: '#d9531e',
        border: '1px solid #d9531e',
        marginTop: '20px',
        '&:hover': {
          backgroundColor: alpha('#d9531e', 0.8), // Applying alpha for hover background color
          color: 'white',border: '0px',
        },
      }}
      type={type}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;