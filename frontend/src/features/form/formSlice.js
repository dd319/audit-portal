// src/features/form/formSlice.js

import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    inp: '',
    audit: '',
    caseError: '',
    caseStatus: '',
    files: []
  },
  reducers: {
    setInp: (state, action) => {
      state.inp = action.payload;
    },
    setAudit: (state, action) => {
      state.audit = action.payload;
    },
    setCaseError: (state, action) => {
      state.caseError = action.payload;
    },
    setCaseStatus: (state, action) => {
      state.caseStatus = action.payload;
    },
    resetForm: (state) => {
      state.inp = '';
      state.audit = '';
      state.caseError = '';
      state.caseStatus = '';
      state.files = [];
    }
  }
});

export const { setInp, setAudit, setCaseError, setCaseStatus, setFiles, resetForm } = formSlice.actions;

export default formSlice.reducer;
