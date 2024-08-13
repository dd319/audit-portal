import React from 'react';
import { Grid, FormControl, InputLabel, TextField, Select, MenuItem } from '@mui/material';

const CustomInput = ({ label, value, onChange, options = [], isSelect = false, textFieldProps = {}, selectProps = {}, gridProps = {}, sx = {} }) => {
  return (
    <Grid item xs={12} md={3} {...gridProps}>
      <InputLabel sx={{ paddingBottom: '10px', fontWeight: '600', color: 'black', ...sx }}>
        {label}
      </InputLabel>
      <FormControl fullWidth>
        {isSelect ? (
          <Select
            value={value || ''}
            onChange={onChange}
            sx={{
              borderRadius: '10px',
              transition: 'border-color 0.3s ease, border-radius 0.3s ease',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              ...sx,
            }}
            {...selectProps}
          >
            {options.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <TextField
            value={value}
            onChange={onChange}
            sx={{
              borderRadius: '10px',
              transition: 'border-color 0.3s ease, border-radius 0.3s ease',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              ...sx,
            }}
            {...textFieldProps}
          />
        )}
      </FormControl>
    </Grid>
  );
};

export default CustomInput;