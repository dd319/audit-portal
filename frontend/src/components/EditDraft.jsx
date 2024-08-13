import CustomButton from '../CustomButton';
import React, { useState, useEffect } from 'react';
// import Header from '../Header';
import { FormControl, InputLabel, MenuItem, Select, Typography, TextField, Grid, Box, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import '../css/styles.css';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import {
    audit_type_check, audit_type_status, audit_type_is_there_any_case_error, case_select_category, case_error_definition
    , case_final_error_category
    , cwe_check_status,
    cwithoute_check_status, cwithoute_change_status, cwe_error_definition, cwe_select_category, cwe_change_status
} from './options';
import { useLocation } from 'react-router-dom';



const Landing = () => {
    const [barcode, setBarcode] = useState('');
    const location = useLocation();
    const [audit_type, setAuditType] = useState('');
    const [case_error, setCaseError] = useState('');
    const [case_status, setCaseStatus] = useState('');
    const [componentsWithError, setComponentsWithError] = useState([]);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState([]);
    const [fieldErrors, setFieldErrors] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [select_category, selectCategory] = useState('')
    const [sub_barcode, setSubbarcode] = useState('')
    const [check_status, setCheckStatus] = useState('')
    const [change_status, setChangeStatus] = useState('')
    const [error_definition, setErrorDefinition] = useState('')

    const [count_for_cwe, setcountforcwe] = useState(0);
    const check_counter_for_cwe_string = count_for_cwe.toString();

    const [count_for_cwithoute, setcountforcwithoute] = useState(0);
    const check_counter_for_cwithoute_string = count_for_cwithoute.toString();


    const [count_for_errorcase, setcountforerrorcase] = useState(0);

    const check_counter_for_errorcase_string = count_for_errorcase.toString();






    const validateSubBarcodeForCwithoutError = (sub_barcode, index) => {
        // Combined regex for sub bar code and barcode
        const subBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}(-[A-Z]{2}\d{2})?$/;

        // Check if barcode matches the combined pattern
        const isValid = subBarcodeRegex.test(sub_barcode);
        const updatedErrors = [...fieldErrors];
        updatedErrors[index] = isValid ? '' : 'Invalid Subbarcode';
        setFieldErrors(updatedErrors);
    };

    useEffect(() => {
        if (case_error === 'yes' && addNewItem.length === 0) {
            handleAddNewItem();
        } else if (case_error === 'no' || case_error === 'incomplete') {
            setAddNewItem([]);
        }
    }, [case_error]);

    const validateBarcode = (barcode) => {
        // // Regex for sub bar code
        // const fullBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}-[A-Z]{2}\d{2}$/;

        // Regex for barcode 
        const partialBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}$/;

        // Check if barcode matches either pattern
        if (partialBarcodeRegex.test(barcode)) {
            return true;
        }
        return false;
    };

    const validateSubBarcodeforcwe = (barcode, index) => {
        // Combined regex for sub bar code and barcode
        const subBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}(-[A-Z]{2}\d{2})?$/;

        // Check if barcode matches the combined pattern
        const isValid = subBarcodeRegex.test(barcode);
        const updatedErrors = [...errors];
        updatedErrors[index] = isValid ? '' : 'Invalid Subbarcode';
        setErrors(updatedErrors);
    };



    // const accessToken = Cookies.get('access_token');





    // const handleSubmit = (e,audit) => {
    //     e.preventDefault(); // Prevent the default form submission behavior

    //     try {
    //         const response = axios.get(`http://127.0.0.1:8000/api/auth/audit/`,{
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${accessToken}`,
    //             },
    //         });
    //         console.log('Response:', response.data);
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }

      

    //     // Validate barcode
    //     if (!validateBarcode(barcode)) {
    //         alert('Please fill in the correct barcode.');
    //         return; // Stop the submission process if validation fails
    //     }

    // };


    const editdata = localStorage.getItem('auditData');

    if (editdata) {
      const parsedData = JSON.parse(editdata);
      console.log(parsedData.id);
    } else {
      console.log('No data found in localStorage for key "auditData".');
    }
    

    const accessToken = Cookies.get('access_token');


    const handleSubmit = async (e, editdata) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        if (!editdata || !editdata.id) {
            console.error('Edit data or edit data ID is missing');
            return; // Stop execution if editData or editData.id is not available
        }
    
        // Construct formData based on your editData
        const formData = {
            barcode,
            audit_type,
            case_error,
            case_status,
            status: 'draft',
            created_at: new Date().toISOString().split('T')[0],
            error_cases: (editdata.error_cases || []).map(item => ({
                select_category: item.select_category,
                error_definition: item.error_definition,
                final_error_category: item.final_error_category,
                remarks: item.remarks,
                remarks_for_operations: item.remarks_for_operations,
                files: (item.files || []).map(f => ({
                    file: f.file
                })),
                counter1: item.counter1
            })),
    
            componentsWithError: (editdata.componentsWithError || []).map(component => ({
                select_category: component.select_category,
                sub_barcode: component.sub_barcode,
                change_status: component.change_status,
                check_status: component.check_status,
                remarks: component.remarks,
                error_definition: component.error_definition,
                remarks_for_operations: component.remarks_for_operations,
                files: (component.files || []).map(f => ({
                    file: f.file
                })),
                counter2: component.counter2
            })),
    
            componentsWithoutError: (editdata.componentsWithoutError || []).map(component => ({
                sub_barcode: component.sub_barcode,
                remarks: component.remarks,
                remarks_for_operations: component.remarks_for_operations,
                counter3: component.counter3,
                check_status: component.check_status,
                change_status: component.change_status,
            })),
        };
    
        try {
            // Make an API request using audit.id
            const response = await axios.patch(`http://127.0.0.1:8000/api/auth/audit/update-audit/${editdata.id}/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    
        // Validate barcode
        if (!validateBarcode(barcode)) {
            alert('Please fill in the correct barcode.');
            return; // Stop the submission process if validation fails
        }
    };
    
    
    

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleInpChange = (e) => {
        setBarcode(e.target.value.toUpperCase());
        if (!validateBarcode(e.target.value)) {
            setError('Invalid barcode');
        } else {
            setError('');
        }
    }
    const handleAuditChange = (e) => setAuditType(e.target.value);
    const handleCaseErrorChange = (e) => setCaseError(e.target.value);
    const handleCaseStatusChange = (e) => setCaseStatus(e.target.value);


    // test component without error
    const [componentsWithoutError, setComponentsWithoutError] = useState([]);

    // Method to handle input changes for components without error
    const handleInputChangeWithoutError = (index, field, value) => {
        setComponentsWithoutError(prevComponents => {
            const updatedComponents = [...prevComponents];
            updatedComponents[index] = { ...updatedComponents[index], [field]: value };
            return updatedComponents;
        });
    };

    // Method to add a new component without error

    const handleAddComponentWithoutError = () => {
        setcountforcwithoute(count_for_cwithoute + 1);
        setComponentsWithoutError(prevComponents => [
            ...prevComponents,
            {
                barcode: '',
                audit_type: '',
                case_status: '',
                remarks: '',
                remarks_for_operations: ''
            }
        ]);
    };


    // Method to remove a component without error by index
    const handleRemoveComponentWithoutError = (index) => {
        setComponentsWithoutError(prevComponents =>
            prevComponents.filter((_, i) => i !== index)
        );
        setcountforcwithoute(count_for_cwithoute - 1);
    };

    const handleInputChangeWithError = (index, field, value) => {
        const updatedComponents = [...componentsWithError];
        if (field === 'file') {
            updatedComponents[index][field] = value;
        } else {
            updatedComponents[index][field] = value;
        }
        setComponentsWithError(updatedComponents);

        if (field === 'barcode') {
            validateSubBarcodeforcwe(value, index);
        }
    };


    const handleFileInputChangeWithError = async (index, files) => {
        const updatedComponents = [...componentsWithError];

        // Convert files to an array if not already
        const filesArray = Array.from(files);

        // Convert files to base64 and store as objects
        const base64Files = await Promise.all(filesArray.map(async file => ({
            file: await convertToBase64(file)
        })));

        updatedComponents[index]['file'] = base64Files;

        setComponentsWithError(updatedComponents);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };


    // Method to add a new component with error



    const handleAddComponentWithError = () => {
        setcountforcwe(count_for_cwe + 1);
        setComponentsWithError([
            ...componentsWithError,
            {
                barcode: '',
                audit_type: '',
                case_error: '',
                case_status: '',
                remarks: '',
                remarks_for_operations: '',
                file: null
            }
        ]);
        setErrors([...errors, '']);
    };

    // Method to remove a component with error by index

    const handleRemoveComponentWithError = (index) => {
        const updatedComponents = componentsWithError.filter((_, i) => i !== index);
        const updatedErrors = errors.filter((_, i) => i !== index);
        setComponentsWithError(updatedComponents);
        setErrors(updatedErrors);
        setcountforcwe(count_for_cwe - 1);
    };


    const [addNewItem, setAddNewItem] = useState([]);

    const handleAddNewItem = () => {
        setcountforerrorcase(count_for_errorcase + 1);
        setAddNewItem([
            ...addNewItem,
            {
                audit_type: '',
                errorDefinition: '',
                finalErrorCategory: '',
                remarks: '',
                remarks_for_operations: '',
                file: null, // Add file property
            },
        ]);
    };

    const handleInputnewchange = (index, field, value) => {
        const updatedItems = addNewItem.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setAddNewItem(updatedItems);
    };

    //////////////////////////////////
    const handleFileChange = async (index, files) => {
        const updatedComponents = [...addNewItem];

        // Convert files to an array if not already
        const filesArray = Array.from(files);

        // Convert files to base64 and store as objects
        const base64Files = await Promise.all(filesArray.map(async file => ({
            file: await convertToBase64forcaseerror(file)
        })));

        updatedComponents[index]['file'] = base64Files;

        setAddNewItem(updatedComponents);
    };

    const convertToBase64forcaseerror = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleRemoveNewItem = (index) => {
        setcountforerrorcase(count_for_errorcase - 1);
        const updatedItems = addNewItem.filter((_, i) => i !== index);
        setAddNewItem(updatedItems);
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const fromDraft = query.get('fromDraft') === 'true';

        if (fromDraft) {
            // Load data from localStorage
            const savedData = localStorage.getItem('auditData');

            if (savedData) {
                const parsedData = JSON.parse(savedData);
                console.log(parsedData.id);
              }
       
            if (savedData) {
                const data = JSON.parse(savedData);

                setBarcode(data.barcode || '');
                setAuditType(data.audit_type || '');
                setCaseError(data.case_error || '');
                setCaseStatus(data.case_status || '');
                if (data.error_cases) {
                    setAddNewItem(data.error_cases.map(item => ({
                        select_category: item.select_category || '',
                        errorDefinition: item.error_definition || '',
                        finalErrorCategory: item.final_error_category || '',
                        remarks: item.remarks || '',
                        remarks_for_operations: item.remarks_for_operations || '',
                        files: item.files || [],
                    })));
                } else {
                    setAddNewItem([]);
                }
                setComponentsWithError(data.componentsWithError || []);
                setComponentsWithoutError(data.componentsWithoutError || []);
                
             

 
            


            }
        } else {
            // Normal case, handle if necessary
            setBarcode('');
            setAuditType('');
            setCaseError('');
            setCaseStatus('');
            setComponentsWithError([]);
            setComponentsWithError([]);
            setAddNewItem([])

        }
    }, [location.search]);



    return (
        <>
        
            <Box sx={{ width: '100%', padding: '50px 0', display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={0} sx={{ width: '100%', maxWidth: '1500px', padding: '20px', overflow: 'hidden', margin: '20px' }}>


                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Type of Audit</InputLabel>
                                    <Select required
                                        value={audit_type || ''}
                                        onChange={handleAuditChange}
                                        label="Type of Audit"
                                    >
                                        {audit_type_check.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                        ))}




                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <TextField required
                                        label="Barcode"
                                        placeholder="Barcode"
                                        value={barcode}
                                        onChange={handleInpChange}
                                        inputProps={{ minLength: 16, maxLength: 16 }}
                                        error={!!error}
                                        helperText={error}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select required
                                        value={case_status || ''}
                                        onChange={handleCaseStatusChange}
                                        label="Case Status"
                                    >
                                        {audit_type_status.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Is there any case error?</InputLabel>
                                    <Select required
                                        value={case_error || ''}
                                        onChange={handleCaseErrorChange}
                                        label="Case Error"
                                    >
                                        {audit_type_is_there_any_case_error.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Box sx={{ margin: '20px', width: '100%' }}>
                                {addNewItem.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            border: '1px solid #ddd',
                                            padding: '16px',
                                            margin: '16px 0',
                                            borderRadius: '8px',
                                            width: '100%',
                                        }}
                                    >

                                        {/* <h1>Counter For Case Error {count_for_errorcase}</h1> */}
                                        <Typography variant='h6' gutterBottom sx={{ marginBottom: '16px' }}>
                                            Case Error {index + 1}
                                        </Typography>

                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Select Category</InputLabel>
                                                    <Select
                                                        required
                                                        value={item.select_category || ''}
                                                        onChange={(e) => handleInputnewchange(index, 'select_category', e.target.value)}
                                                        label="Select Category"
                                                    >
                                                        {case_select_category.map((category, idx) => (
                                                            <MenuItem key={idx} value={category.value}>{category.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Error Definition</InputLabel>
                                                    <Select
                                                        required
                                                        value={item.errorDefinition || ''}
                                                        onChange={(e) => handleInputnewchange(index, 'errorDefinition', e.target.value)}
                                                        label="Error Definition"
                                                    >
                                                        {case_error_definition.map((definition, idx) => (
                                                            <MenuItem key={idx} value={definition.value}>{definition.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Final Error Category</InputLabel>
                                                    <Select
                                                        required
                                                        value={item.finalErrorCategory || ''}
                                                        onChange={(e) => handleInputnewchange(index, 'finalErrorCategory', e.target.value)}
                                                        label="Final Error Category"
                                                    >
                                                        {case_final_error_category.map((category, idx) => (
                                                            <MenuItem key={idx} value={category.value}>{category.name}</MenuItem>
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
                                                    onChange={(e) => handleInputnewchange(index, 'remarks', e.target.value)}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    multiline
                                                    rows={4}
                                                    label="Remarks for Operations"
                                                    value={item.remarks_for_operations}
                                                    onChange={(e) => handleInputnewchange(index, 'remarks_for_operations', e.target.value)}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth>
                                                    {/* <InputLabel>Upload Files</InputLabel> */}
                                                    <TextField required
                                                        type="file"
                                                        inputProps={{ multiple: true }} // Allow multiple file uploads
                                                        onChange={(e) => handleFileChange(index, e.target.files)}
                                                        fullWidth
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
                                                    <Grid item>
                                                        <CustomButton
                                                            onClick={() => handleRemoveNewItem(index)}
                                                            variant="outlined"
                                                            color="error"
                                                            sx={{ marginBottom: '20px', marginRight: '10px' }}
                                                        >
                                                            Remove Item
                                                        </CustomButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <CustomButton
                                                            onClick={handleAddNewItem}
                                                            sx={{ marginBottom: '20px' }}
                                                        >
                                                            Add Item
                                                        </CustomButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Box>




                            {/* Components With Error */}


                            <Grid item xs={12} sx={{ marginTop: '20px' }}>
                                {/* <h1>Counter For Cwe {count_for_cwe}</h1> */}

                                <Typography variant='h4' gutterBottom sx={{ fontSize: '1.5rem' }}>
                                    Components With Error
                                </Typography>
                                <CustomButton onClick={handleAddComponentWithError}>
                                    Add Item
                                </CustomButton>
                                {componentsWithError.map((component, index) => (
                                    <Box key={index} sx={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '8px', overflow: 'hidden' }}>
                                        <Typography variant='h6' gutterBottom>Component with Error {index + 1}</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField 
                                                        label="Enter Sub Bar Code"
                                                        value={component.sub_barcode || ''}


                                                        onChange={(e) => {
                                                            handleInputChangeWithError(index, 'sub_barcode', e.target.value.toUpperCase());
                                                            validateSubBarcodeforcwe(e.target.value, index);
                                                        }}

                                                        inputProps={{ minLength: 21, maxLength: 21 }}
                                                        error={Boolean(errors[index])}
                                                        helperText={errors[index]}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Check Status</InputLabel>
                                                    <Select 
                                                        value={component.check_status || ''}
                                                        onChange={(e) => handleInputChangeWithError(index, 'check_status', e.target.value)}
                                                        label="Check Status"
                                                    >
                                                        {cwe_check_status.map((item, index) => (
                                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Error Definition</InputLabel>
                                                    <Select 
                                                        value={component.error_definition || ''}
                                                        onChange={(e) => handleInputChangeWithError(index, 'error_definition', e.target.value)}
                                                        label="Error Definition"
                                                    >
                                                        {cwe_error_definition.map((item, index) => (
                                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>


                                            <Grid item xs={12} sm={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Select Category</InputLabel>
                                                    <Select 
                                                        value={component.select_category || ''}
                                                        onChange={(e) => handleInputChangeWithError(index, 'select_category', e.target.value)}
                                                        label="Select Category"
                                                    >
                                                        {cwe_select_category.map((item, index) => (
                                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>













                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Change Status</InputLabel>
                                                    <Select 
                                                        value={component.change_status || ''}
                                                        onChange={(e) => handleInputChangeWithError(index, 'change_status', e.target.value)}
                                                        label="Case Status"
                                                    >
                                                        {cwe_change_status.map((item, index) => (
                                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <TextField multiline
                                                        rows={4}
                                                        label='Remarks'
                                                        variant='outlined'
                                                        value={component.remarks}
                                                        onChange={(e) => handleInputChangeWithError(index, 'remarks', e.target.value)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <TextField multiline
                                                        rows={4}
                                                        label='Remarks for Operations'
                                                        variant='outlined'
                                                        value={component.remarks_for_operations}
                                                        onChange={(e) => handleInputChangeWithError(index, 'remarks_for_operations', e.target.value)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth>
                                                    {/* <InputLabel>Upload Files</InputLabel> */}
                                                    <TextField
                                                        type="file"
                                                        inputProps={{ multiple: true }} // Allow multiple file uploads
                                                        onChange={(e) => handleFileInputChangeWithError(index, e.target.files)}
                                                        fullWidth
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomButton onClick={() => handleRemoveComponentWithError(index)}>
                                                    Remove Item
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Grid>

                            {/* Components Without Error */}
                            <Grid item xs={12} sx={{ marginTop: '20px' }}>

                                {/* <h1>Counter For Cwithoute {count_for_cwithoute}</h1> */}
                                <Typography variant='h4' gutterBottom sx={{ fontSize: '1.5rem' }}>
                                    Components Without Error
                                </Typography>
                                <CustomButton onClick={handleAddComponentWithoutError}>
                                    Add Item
                                </CustomButton>
                                {componentsWithoutError.map((component, index) => (
                                    <Box key={index} sx={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '8px', overflow: 'hidden' }}>
                                        <Typography variant='h6' gutterBottom>Component Without Error {index + 1}</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        label="Enter Sub Bar Code"
                                                        value={component.sub_barcode}
                                                        onChange={(e) => {
                                                            handleInputChangeWithoutError(index, 'sub_barcode', e.target.value.toUpperCase());
                                                            validateSubBarcodeForCwithoutError(e.target.value, index);
                                                        }}
                                                        inputProps={{ minLength: 21, maxLength: 21 }}
                                                        error={Boolean(fieldErrors[index])}
                                                        helperText={fieldErrors[index]}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Check Status</InputLabel>
                                                    <Select 
                                                        value={component.check_status || ''}
                                                        onChange={(e) => handleInputChangeWithoutError(index, 'check_status', e.target.value)}
                                                        label="Check Status"
                                                    >
                                                        {cwithoute_check_status.map((item, index) => (
                                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Change Status</InputLabel>
                                                    <Select 
                                                        value={component.change_status || ''}
                                                        onChange={(e) => handleInputChangeWithoutError(index, 'change_status', e.target.value)}
                                                        label="Change Status"
                                                    >
                                                        {cwithoute_change_status.map((item, index) => (
                                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <TextField multiline
                                                        rows={4}
                                                        label='Remarks'
                                                        variant='outlined'
                                                        value={component.remarks}
                                                        onChange={(e) => handleInputChangeWithoutError(index, 'remarks', e.target.value)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <TextField multiline
                                                        rows={4}
                                                        label='Remarks for Operations'
                                                        variant='outlined'
                                                        value={component.remarks_for_operations}
                                                        onChange={(e) => handleInputChangeWithoutError(index, 'remarks_for_operations', e.target.value)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomButton onClick={() => handleRemoveComponentWithoutError(index)}>
                                                    Remove Item
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Grid>



                            <Grid container item xs={12} spacing={2} sx={{ display: 'flex' }}>
                                <Grid item> <CustomButton type="submit">Update</CustomButton></Grid>
       
                            </Grid>

                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackbar}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            >
                                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%', maxWidth: 400 }}>
                                    All fields are required!
                                </Alert>
                            </Snackbar>


                        </Grid>
                    </form>
                </Paper>
            </Box>
        </>
    );
};

export default Landing;