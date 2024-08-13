// import React, { useState } from 'react';

// const AccordionSection = ({ caseItem }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleAccordion = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className="accordion-sect">
//             <button className="accordion" onClick={toggleAccordion}>
//                 <div className="data">
//                     <div><strong>Audit Type:</strong> {caseItem.auditType}</div>
//                     <div><strong>Barcode:</strong> {caseItem.barcode}</div>
//                     <div><strong>Status:</strong> {caseItem.status}</div>
//                     <div><strong>Submitted Date:</strong> {caseItem.submittedDate}</div>
//                 </div>
//             </button>
//             {isOpen && (
//                 <div className="panel">
//                     {/* Add detailed case information here */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AccordionSection;

// src/components/AccordionSection.jsx
// import React, { useState } from 'react';
// import {
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     Typography,
//     Box,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const AccordionSection = ({ caseItem }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleAccordion = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <Accordion expanded={isOpen} onChange={toggleAccordion}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Box display="flex" flexDirection="column">
//                     <Typography variant="h6">Barcode: {caseItem.inp}</Typography>
//                     <Typography variant="body2" color="textSecondary">Audit Type: {caseItem.audit}</Typography>
//                     <Typography variant="body2" color="textSecondary">Case Status: {caseItem.caseStatus}</Typography>
//                 </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//                 <Typography variant="body1">
//                     Remarks: {caseItem.remarks}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                     Remarks for Operations: {caseItem.remarks_for_operations}
//                 </Typography>
//             </AccordionDetails>
//         </Accordion>
//     );
// };

// export default AccordionSection;

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Button,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

const AccordionSection = ({
  title,
  items,
  setItems,
  handleInputChange,
  validateSubBarcode,
  auditTypeCheckOptions,
  caseErrorOptions,
  caseStatusOptions
}) => {
  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        inp: '',
        audit: '',
        caseError: '',
        caseStatus: '',
        remarks: '',
        remarks_for_operations: ''
      }
    ]);
  };

  const handleRemoveItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '1.5rem' }}>
        {title}
      </Typography>
      <Button onClick={handleAddItem}>Add Item</Button>
      {items.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{`${title} ${index + 1}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Enter Sub Bar Code"
                    value={item.inp}
                    onChange={(e) => handleInputChange(index, 'inp', e.target.value)}
                    inputProps={{ minLength: 21, maxLength: 21 }}
                    error={Boolean(validateSubBarcode && validateSubBarcode(item.inp, index))}
                    helperText={validateSubBarcode && validateSubBarcode(item.inp, index)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Check Status</InputLabel>
                  <Select
                    value={item.audit}
                    onChange={(e) => handleInputChange(index, 'audit', e.target.value)}
                  >
                    {auditTypeCheckOptions.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Case Error</InputLabel>
                  <Select
                    value={item.caseError}
                    onChange={(e) => handleInputChange(index, 'caseError', e.target.value)}
                  >
                    {caseErrorOptions.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Case Status</InputLabel>
                  <Select
                    value={item.caseStatus}
                    onChange={(e) => handleInputChange(index, 'caseStatus', e.target.value)}
                  >
                    {caseStatusOptions.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  multiline
                  rows={4}
                  label="Remarks"
                  value={item.remarks}
                  onChange={(e) => handleInputChange(index, 'remarks', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  multiline
                  rows={4}
                  label="Remarks for Operations"
                  value={item.remarks_for_operations}
                  onChange={(e) => handleInputChange(index, 'remarks_for_operations', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  onClick={() => handleRemoveItem(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AccordionSection;

