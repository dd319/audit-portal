import React from 'react';
import { InputLabel } from '@mui/material';

const CustomInputLabel = ({ label }) => {
    return (
        <InputLabel sx={{ fontWeight: '700', fontSize: '20px',color:'black' }}>
            {label}
        </InputLabel>
    );
};

export default CustomInputLabel;