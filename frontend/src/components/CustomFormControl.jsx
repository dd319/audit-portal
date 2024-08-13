import React from 'react';
import { FormControl } from '@mui/material';

const CustomFormControl = ({ children }) => {
    return (
        <FormControl fullWidth sx={{ paddingTop: '20px' }}>
            {children}
        </FormControl>
    );
};

export default CustomFormControl;