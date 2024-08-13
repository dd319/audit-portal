// src/Second.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, Button, TextField, Grid, Container } from '@mui/material';
import Cwithoute from './cwithoute';
import Cwe from './cwe';
import { setInp, setAudit, setCaseError, setCaseStatus, resetForm } from './formSlice';
import { auditOptions, caseErrorOptions, caseStatusOptions } from './options';

const Second = () => {
  const dispatch = useDispatch();
  const { inp, audit, caseError, caseStatus } = useSelector((state) => state.form);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log("Barcode:", inp);
    console.log("Type of Audit:", audit);
    console.log("Case Error:", caseError);
    console.log("Case Status:", caseStatus);
    
    // Reset form fields
    dispatch(resetForm());
  };

  const handleInpChange = (e) => dispatch(setInp(e.target.value));
  const handleAuditChange = (e) => dispatch(setAudit(e.target.value));
  const handleCaseErrorChange = (e) => dispatch(setCaseError(e.target.value));
  const handleCaseStatusChange = (e) => dispatch(setCaseStatus(e.target.value));

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          {/* Type of Audit Select */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type of Audit*</InputLabel>
              <Select
                value={audit}
                onChange={handleAuditChange}
                label="Type of Audit*"
              >
                {auditOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Barcode Input */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Barcode"
                placeholder="Barcode"
                value={inp}
                onChange={handleInpChange}
                inputProps={{ minLength: 16, maxLength: 16 }}
              />
            </FormControl>
          </Grid>

          {/* Case Error Select */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Is there any case error?</InputLabel>
              <Select
                value={caseError}
                onChange={handleCaseErrorChange}
                label="Case Error"
              >
                {caseErrorOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Case Status Select */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={caseStatus}
                onChange={handleCaseStatusChange}
                label="Case Status*"
              >
                {caseStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Conditionally Render Subcomponents */}
          <Grid item xs={12}>
            {caseError === 'yes' && <Cwe />}
            {caseError === 'no' && <Cwithoute />}
          </Grid>

          <Grid item xs={12}>
            <Button   sx={{ backgroundColor: '#d9531e' }}
              type="submit"
              variant="contained"
              color="error"
              style={{ marginTop: '20px' }}
            >
              Submit
            </Button>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default Second;
