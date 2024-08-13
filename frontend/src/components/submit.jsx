// import React, { useState, useEffect } from 'react';
// import { FormControl, InputLabel, MenuItem, Select, Typography, TextField, Grid, Box, Paper, Snackbar, Alert, Button } from '@mui/material';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import '../css/styles.css'; // Assuming you have some global styles

// import {
//   audit_type_check, audit_type_status, audit_type_is_there_any_case_error, case_select_category, case_error_definition, case_final_error_category,
//   cwe_check_status, cwe_case_error, cwe_case_status, cwithoute_check_status, cwithoute_case_status
// } from './options';

// const Submit = () => {
//   const [inp, setInp] = useState('');
//   const [audit, setAudit] = useState('');
//   const [caseError, setCaseError] = useState('');
//   const [caseStatus, setCaseStatus] = useState('');
//   const [componentsWithError, setComponentsWithError] = useState([]);
//   const [componentsWithoutError, setComponentsWithoutError] = useState([]);
//   const [addNewItem, setAddNewItem] = useState([]);
//   const [error, setError] = useState('');
//   const [errors, setErrors] = useState([]);
//   const [fieldErrors, setFieldErrors] = useState([]);
//   const [isRequired, setIsRequired] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const accessToken = Cookies.get('access_token');

//   const validateBarcode = (barcode) => {
//     const partialBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}$/;
//     return partialBarcodeRegex.test(barcode);
//   };

//   const validateSubBarcode = (barcode, index, setter) => {
//     const subBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}(-[A-Z]{2}\d{2})?$/;
//     const isValid = subBarcodeRegex.test(barcode);
//     setter(prevErrors => {
//       const updatedErrors = [...prevErrors];
//       updatedErrors[index] = isValid ? '' : 'Invalid Subbarcode';
//       return updatedErrors;
//     });
//   };

//   const handleInpChange = (e) => {
//     setInp(e.target.value);
//     setError(validateBarcode(e.target.value) ? '' : 'Invalid barcode');
//   };

//   const handleAuditChange = (e) => setAudit(e.target.value);
//   const handleCaseErrorChange = (e) => setCaseError(e.target.value);
//   const handleCaseStatusChange = (e) => setCaseStatus(e.target.value);

//   useEffect(() => {
//     if (caseError === 'yes' && addNewItem.length === 0) {
//       handleAddNewItem();
//     } else if (caseError === 'no') {
//       setAddNewItem([]);
//     }
//   }, [caseError]);

//   const handleSaveOrSubmit = async (e, status) => {
//     e.preventDefault();

//     const formData = {
//       inp,
//       audit,
//       caseError,
//       caseStatus,
//       status: status,
//       error_cases: addNewItem.map(item => ({
//         audit: item.audit,
//         error_Definition: item.errorDefinition,
//         final_error_category: item.finalErrorCategory,
//         remarks: item.remarks,
//         remarks_for_operations: item.remarks_for_operations,
//       })),
//       componentWithError: componentsWithError.map(component => ({
//         inp: component.inp,
//         audit: component.audit,
//         caseError: component.caseError,
//         caseStatus: component.caseStatus,
//         remarks: component.remarks,
//         remarks_for_operations: component.remarks_for_operations,
//       })),
//       componentsWithoutError: componentsWithoutError.map(component => ({
//         inp: component.inp,
//         audit: component.audit,
//         caseStatus: component.caseStatus,
//         remarks: component.remarks,
//         remarks_for_operations: component.remarks_for_operations,
//       })),
//     };

//     localStorage.setItem('formData', JSON.stringify(formData));

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/auth/audit/', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       });

//       console.log('Response:', response.data);

//       localStorage.removeItem('formData');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleSubmit = (e) => { handleSaveOrSubmit(e, 'submitted'); setIsRequired(true); if (!inp || !audit || !caseError || !caseStatus) { setSnackbarOpen(true); } };
//   const handleSave = (e) => { handleSaveOrSubmit(e, 'draft'); setIsRequired(false); alert('Form Saved Successfully') };

//   const handleCloseSnackbar = () => setSnackbarOpen(false);

//   const handleInputChangeWithError = (index, field, value) => {
//     const updatedComponents = [...componentsWithError];
//     updatedComponents[index][field] = value;
//     setComponentsWithError(updatedComponents);
//     if (field === 'inp') {
//       validateSubBarcode(value, index, setErrors);
//     }
//   };

//   const handleAddComponentWithError = () => {
//     setComponentsWithError([
//       ...componentsWithError,
//       {
//         inp: '',
//         audit: '',
//         caseError: '',
//         caseStatus: '',
//         remarks: '',
//         remarks_for_operations: ''
//       }
//     ]);
//     setErrors([...errors, '']);
//   };

//   const handleRemoveComponentWithError = (index) => {
//     setComponentsWithError(componentsWithError.filter((_, i) => i !== index));
//     setErrors(errors.filter((_, i) => i !== index));
//   };

//   const handleInputChangeWithoutError = (index, field, value) => {
//     setComponentsWithoutError(prevComponents => {
//       const updatedComponents = [...prevComponents];
//       updatedComponents[index] = { ...updatedComponents[index], [field]: value };
//       return updatedComponents;
//     });
//   };

//   const handleAddComponentWithoutError = () => {
//     setComponentsWithoutError([
//       ...componentsWithoutError,
//       {
//         inp: '',
//         audit: '',
//         caseStatus: '',
//         remarks: '',
//         remarks_for_operations: ''
//       }
//     ]);
//   };

//   const handleRemoveComponentWithoutError = (index) => {
//     setComponentsWithoutError(componentsWithoutError.filter((_, i) => i !== index));
//   };

//   const handleAddNewItem = () => {
//     setAddNewItem([
//       ...addNewItem,
//       {
//         audit: '',
//         errorDefinition: '',
//         finalErrorCategory: '',
//         remarks: '',
//         remarks_for_operations: '',
//       },
//     ]);
//   };

//   const handleInputnewchange = (index, field, value) => {
//     const updatedItems = addNewItem.map((item, i) =>
//       i === index ? { ...item, [field]: value } : item
//     );
//     setAddNewItem(updatedItems);
//   };

//   const handleRemoveNewItem = (index) => {
//     setAddNewItem(addNewItem.filter((_, i) => i !== index));
//   };

//   return (
//     <Box sx={{ width: '100%', padding: '50px 0', display: 'flex', justifyContent: 'center' }}>
//       <Paper elevation={2} sx={{ width: '100%', maxWidth: '1500px', padding: '20px', margin: '20px' }}>
//         <Typography variant="h3" sx={{ color: '#D9531E', textAlign: 'center', marginBottom: '40px' }}>
//           Audit Portal
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth>
//                 <InputLabel>Type of Audit</InputLabel>
//                 <Select
//                   required={isRequired}
//                   value={audit}
//                   onChange={handleAuditChange}
//                   label="Type of Audit"
//                 >
//                   {audit_type_check.map((item, index) => (
//                     <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth>
//                 <TextField
//                   required={isRequired}
//                   label="Barcode"
//                   placeholder="Barcode"
//                   value={inp}
//                   onChange={handleInpChange}
//                   inputProps={{ minLength: 16, maxLength: 16 }}
//                   error={!!error}
//                   helperText={error}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   required={isRequired}
//                   value={caseStatus}
//                   onChange={handleCaseStatusChange}
//                   label="Case Status"
//                 >
//                   {audit_type_status.map((item, index) => (
//                     <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth>
//                 <InputLabel>Is there any case error?</InputLabel>
//                 <Select
//                   required={isRequired}
//                   value={caseError}
//                   onChange={handleCaseErrorChange}
//                   label="Case Error"
//                 >
//                   {audit_type_is_there_any_case_error.map((item, index) => (
//                     <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Box sx={{ margin: '20px', width: '100%' }}>
//               {addNewItem.map((item, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     border: '1px solid #ddd',
//                     padding: '16px',
//                     margin: '16px 0',
//                     borderRadius: '8px', width: '100%'
//                   }}
//                 >
//                   <Typography variant='h6' gutterBottom sx={{ marginBottom: '16px' }}>
//                     Case Error {index + 1}
//                   </Typography>

//                   <Grid container spacing={3}>
//                     <Grid item xs={12} sm={4}>
//                       <FormControl fullWidth>
//                         <InputLabel>Select Category</InputLabel>
//                         <Select
//                           required={isRequired}
//                           value={item.audit}
//                           onChange={(e) => handleInputnewchange(index, 'audit', e.target.value)}
//                           label="Select Category"
//                         >
//                           {case_select_category.map((item, idx) => (
//                             <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <FormControl fullWidth>
//                         <InputLabel>Error Definition</InputLabel>
//                         <Select
//                           required={isRequired}
//                           value={item.errorDefinition}
//                           onChange={(e) => handleInputnewchange(index, 'errorDefinition', e.target.value)}
//                           label="Error Definition"
//                         >
//                           {case_error_definition.map((item, idx) => (
//                             <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <FormControl fullWidth>
//                         <InputLabel>Final Error Category</InputLabel>
//                         <Select
//                           required={isRequired}
//                           value={item.finalErrorCategory}
//                           onChange={(e) => handleInputnewchange(index, 'finalErrorCategory', e.target.value)}
//                           label="Final Error Category"
//                         >
//                           {case_final_error_category.map((item, idx) => (
//                             <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         multiline
//                         rows={4}
//                         label="Remarks"
//                         value={item.remarks}
//                         onChange={(e) => handleInputnewchange(index, 'remarks', e.target.value)}
//                         fullWidth
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         multiline
//                         rows={4}
//                         label="Remarks for Operations"
//                         value={item.remarks_for_operations}
//                         onChange={(e) => handleInputnewchange(index, 'remarks_for_operations', e.target.value)}
//                         fullWidth
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
//                         <Grid item>
//                           <Button
//                             onClick={() => handleRemoveNewItem(index)}
//                             variant="outlined"
//                             color="error"
//                             sx={{ marginBottom: '20px', marginRight: '10px' }}
//                           >
//                             Remove Item
//                           </Button>
//                         </Grid>
//                         <Grid item>
//                           <Button
//                             onClick={handleAddNewItem}
//                             sx={{ marginBottom: '20px' }}
//                           >
//                             Add Item
//                           </Button>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               ))}
//             </Box>

//             <Grid item xs={12} sx={{ marginTop: '20px' }}>
//               <Typography variant='h4' gutterBottom sx={{ fontSize: '1.5rem' }}>
//                 Components With Error
//               </Typography>
//               <Button onClick={handleAddComponentWithError}>
//                 Add Item
//               </Button>
//               {componentsWithError.map((component, index) => (
//                 <Box key={index} sx={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '8px', overflow: 'hidden' }}>
//                   <Typography variant='h6' gutterBottom>Component with Error {index + 1}</Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <FormControl fullWidth>
//                         <TextField
//                           required={isRequired}
//                           label="Enter Sub Bar Code"
//                           value={component.inp}
//                           onChange={(e) => handleInputChangeWithError(index, 'inp', e.target.value)}
//                           inputProps={{ minLength: 21, maxLength: 21 }}
//                           error={Boolean(errors[index])}
//                           helperText={errors[index]}
//                         />
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <FormControl fullWidth>
//                         <InputLabel>Check Status</InputLabel>
//                         <Select
//                           required={isRequired}
//                           value={component.audit}
//                           onChange={(e) => handleInputChangeWithError(index, 'audit', e.target.value)}
//                           label="Check Status"
//                         >
//                           {cwe_check_status.map((item, idx) => (
//                             <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <FormControl fullWidth>
//                         <InputLabel>Case Error</InputLabel>
//                         <Select
//                           required={isRequired}
//                           value={component.caseError}
//                           onChange={(e) => handleInputChangeWithError(index, 'caseError', e.target.value)}
//                           label="Case Error"
//                         >
//                           {cwe_case_error.map((item, idx) => (
//                             <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <FormControl fullWidth>
//                         <InputLabel>Case Status</InputLabel>
//                         <Select
//                           required={isRequired}
//                           value={component.caseStatus}
//                           onChange={(e) => handleInputChangeWithError(index, 'caseStatus', e.target.value)}
//                           label="Case Status"
//                         >
//                           {cwe_case_status.map((item, idx) => (
//                             <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <FormControl fullWidth>
//                         <TextField
//                           multiline
//                           rows={4}
//                           label='Remarks'
//                           variant='outlined'
//                           value={component.remarks}
//                           onChange={(e) => handleInputChangeWithError(index, 'remarks', e.target.value)}
//                         />
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <FormControl fullWidth>
//                         <TextField
//                           multiline
//                           rows={4}
//                           label='Remarks for Operations'
//                           variant='outlined'
//                           value={component.remarks_for_operations}
//                           onChange={(e) => handleInputChangeWithError(index, 'remarks_for_operations', e.target.value)}
//                         />
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button onClick={() => handleRemoveComponentWithError(index)}>
//                         Remove Item
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               ))}
//             </Grid>

//             <Grid item xs={12} sx={{ marginTop: '20px' }}>
//               <Typography variant='h4' gutterBottom sx={{ fontSize: '1.5rem' }}>
//                 Components Without Error
//               </Typography>
//               <Button onClick={handleAddComponentWithoutError}>
//                 Add Item
//               </Button>
//               {componentsWithoutError.map((component, index) => (
//                 <Box key={index} sx={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '8px', overflow: 'hidden' }}>
//                   <Typography variant='h6' gutterBottom>Component Without Error {index + 1}</Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <FormControl fullWidth>
//                         <TextField
//                           required={isRequired}
//                           label="Enter Sub Bar Code"
//                           value={component.inp}
//                           onChange={(e) => {
//                             handleInputChangeWithoutError(index, 'inp', e.target.value);
//                             validateSubBarcode(e.target.value, index, setFieldErrors);
//                           }}
//                           inputProps={{ minLength: 21, maxLength: 21 }}
//                           error={Boolean(fieldErrors[index])}
//                           helperText={fieldErrors[index]}
//                         />
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <FormControl fullWidth>
//                         <InputLabel>Check Status</InputLabel>
//                         <Select
//                           required={isRequired}
//                           value={component.audit}
//                           onChange={(e) => handleInputChangeWithoutError(index, 'audit', e.target.value)}
//                           label="Check Status"
//                         >
//                           {cwithoute_check_status.map((item, idx) => (
//                             <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <FormControl fullWidth>
//                         <InputLabel>Case Status</InputLabel>
//                         <Select
//                           required={isRequired}
//                           value={component.caseStatus}
//                           onChange={(e) => handleInputChangeWithoutError(index, 'caseStatus', e.target.value)}
//                           label="Case Status"
//                         >
//                           {cwithoute_case_status.map((item, idx) => (
//                             <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <FormControl fullWidth>
//                         <TextField
//                           multiline
//                           rows={4}
//                           label='Remarks'
//                           variant='outlined'
//                           value={component.remarks}
//                           onChange={(e) => handleInputChangeWithoutError(index, 'remarks', e.target.value)}
//                         />
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <FormControl fullWidth>
//                         <TextField
//                           multiline
//                           rows={4}
//                           label='Remarks for Operations'
//                           variant='outlined'
//                           value={component.remarks_for_operations}
//                           onChange={(e) => handleInputChangeWithoutError(index, 'remarks_for_operations', e.target.value)}
//                         />
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button onClick={() => handleRemoveComponentWithoutError(index)}>
//                         Remove Item
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               ))}
//             </Grid>

//             <Grid container item xs={12} spacing={2} sx={{ display: 'flex' }}>
//               <Grid item>
//                 <Button type="submit" variant="contained" color="primary">
//                   Submit
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button onClick={handleSave} variant="outlined">
//                   Save
//                 </Button>
//               </Grid>
//             </Grid>

//             <Snackbar
//               open={snackbarOpen}
//               autoHideDuration={6000}
//               onClose={handleCloseSnackbar}
//               anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//               <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%', maxWidth: 400 }}>
//                 All fields are required!
//               </Alert>
//             </Snackbar>
//           </Grid>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default Submit;
