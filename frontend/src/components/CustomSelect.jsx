import React from 'react';
import { Select, MenuItem } from '@mui/material';

const CustomSelect = ({ value, onChange, options }) => {
    return (
        <Select
            required
            value={value || ''}
            onChange={onChange}
            displayEmpty
            sx={{
                color: 'black', // Text color when the component is not focused
                '& .MuiSelect-select': {
                    color: 'black', // Text color inside the Select
                },
                '&:focus': {
                    color: 'black', // Text color when focused
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black', // Border color when not focused
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black', // Keep border color black when focused
                },
                '& .MuiSelect-icon': {
                    color: 'black', // Arrow icon color
                },
                marginRight: '16px', // Fixed margin value
            }}
        >
            <MenuItem value="" disabled>
                --Select--
            </MenuItem>
            {options.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                    {item.name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomSelect;