import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const ThemeSwitch = ({ toggleTheme }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    toggleTheme(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} />}
      label="Dark Theme"
    />
  );
};

export default ThemeSwitch;

