import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ value, onChange, error, helperText, placeholder, multiline = false, rows = 1 }) => {
    return (
        <TextField
            required
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={helperText || error}
            placeholder={placeholder}
            multiline={multiline}
            rows={rows}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'black', // Default border color
                    },
                    '&:hover fieldset': {
                        borderColor: 'black', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'black', // Border color when focused
                    },
                },
                '& .MuiFormHelperText-root': {
                    color: error ? 'red' : 'gray', // Helper text color based on error
                },
                marginRight: '16px', // Fixed margin value
            }}
        />
    );
};

export default CustomTextField;
