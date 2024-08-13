import React from 'react'
import { useState,useEffect } from 'react';
import CustomButton from '../CustomButton';
import { FormControl, InputLabel, MenuItem, Select, Typography, TextField, Grid, Box, Paper, Snackbar, Alert } from '@mui/material';
import {
 
    cwithoute_check_status, cwithoute_change_status,} from './options';
    import CustomInput from './CustomInput';
    import CustomSelect from './CustomSelect';
    import CustomInputLabel from './CustomInputLabel';
    import CustomTextField from './CustomTextField';
    import CustomFormControl from './CustomFormControl';
function Cwithoute({ onComponentsUpdate }) {

 
    
    const [componentsWithoutError, setComponentsWithoutError] = useState([]);
  
    const [fieldErrors, setFieldErrors] = useState([]);
    const [count_for_cwithoute, setcountforcwithoute] = useState(0);
    const [isRequiblack, setIsRequiblack] = useState(false);



    useEffect(() => {
        if (onComponentsUpdate) {
            onComponentsUpdate(componentsWithoutError);
        }
    }, [componentsWithoutError, onComponentsUpdate]);


    
    // Method to handle input changes for components without error
    // const handleInputChangeWithoutError = (index, field, value) => {
    //     setComponentsWithoutError(prevComponents => {
    //         const updatedComponents = [...prevComponents];
    //         updatedComponents[index] = { ...updatedComponents[index], [field]: value };
    //         return updatedComponents;
    //     });
    // };
    const handleInputChangeWithoutError = (index, field, value) => {
        const trimmedValue = value.toUpperCase(); // Convert to uppercase
    
        // Only update if the length is within the limit
        if (trimmedValue.length <= 21) {
            setComponentsWithoutError(prevComponents => {
                const updatedComponents = [...prevComponents];
                updatedComponents[index] = { ...updatedComponents[index], [field]: trimmedValue };
                return updatedComponents;
            });
        } else {
            // Optional: Handle the case where the length exceeds the limit
            // Example: Update error state or provide feedback
            // You might need a mechanism to handle or display this feedback
        }
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

    const validateSubBarcodeForCwithoutError = (sub_barcode, index) => {
        // Combined regex for sub bar code and barcode
        const subBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}(-[A-Z]{2}\d{2})?$/;

        // Check if barcode matches the combined pattern
        const isValid = subBarcodeRegex.test(sub_barcode);
        const updatedErrors = [...fieldErrors];
        updatedErrors[index] = isValid ? '' : 'Invalid Subbarcode';
        setFieldErrors(updatedErrors);
    };
  return (
<>
    <Grid item xs={12} sx={{ marginTop: '20px' }}>
        <Typography variant='h4' gutterBottom sx={{ fontSize: '1.5rem' }}>
            Components Without Error
        </Typography>
        <CustomButton onClick={handleAddComponentWithoutError}>
            Add Item
        </CustomButton>
        {componentsWithoutError.map((component, index) => (
            <Box key={index} sx={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '8px', overflow: 'hidden',backgroundColor:'#f5f5f5' }}>
                <Typography variant='h6' gutterBottom>Component Without Error {index + 1}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomInputLabel label="Enter Sub Bar Code" />
                        <CustomFormControl>
                            <CustomTextField
                                value={component.sub_barcode || ''}
                                onChange={(e) => {
                                    handleInputChangeWithoutError(index, 'sub_barcode', e.target.value.toUpperCase());
                                    validateSubBarcodeForCwithoutError(e.target.value, index);
                                }}
                                inputProps={{ minLength: 21, maxLength: 21 }}
                                error={Boolean(fieldErrors[index])}
                                helperText={fieldErrors[index]}
                                placeholder="Enter your Sub Bar Code"
                            />
                        </CustomFormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomInputLabel label="Check Status" />
                        <CustomFormControl>
                            <CustomSelect
                                value={component.check_status || ''}
                                onChange={(e) => handleInputChangeWithoutError(index, 'check_status', e.target.value)}
                                options={cwithoute_check_status}
                            />
                        </CustomFormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomInputLabel label="Change Status" />
                        <CustomFormControl>
                            <CustomSelect
                                value={component.change_status || ''}
                                onChange={(e) => handleInputChangeWithoutError(index, 'change_status', e.target.value)}
                                options={cwithoute_change_status}
                            />
                        </CustomFormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomInputLabel label="Remarks" />
                        <CustomFormControl>
                            <CustomTextField placeholder="Enter remarks here"
                                multiline
                                rows={4}
                                value={component.remarks || ''}
                                onChange={(e) => handleInputChangeWithoutError(index, 'remarks', e.target.value)}
                            />
                        </CustomFormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomInputLabel label="Remarks for Operations" />
                        <CustomFormControl>
                            <CustomTextField placeholder="Enter remarks for operations here"
                                multiline
                                rows={4}
                                value={component.remarks_for_operations || ''}
                                onChange={(e) => handleInputChangeWithoutError(index, 'remarks_for_operations', e.target.value)}
                            />
                        </CustomFormControl>
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
</>


  )
}

export default Cwithoute