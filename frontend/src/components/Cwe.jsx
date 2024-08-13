import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box,TextField
    
 } from '@mui/material';
import CustomButton from '../CustomButton';
import CustomInputLabel from './CustomInputLabel';
import CustomFormControl from './CustomFormControl';
import CustomSelect from './CustomSelect';
import CustomTextField from './CustomTextField';
import { cwe_check_status, cwe_change_status, cwe_select_category, cwe_error_definition } from './options';


function Cwe({ onComponentsUpdateforcwe }) {
    const [componentsWithError, setComponentsWithError] = useState([]);
    const [fieldErrors, setFieldErrors] = useState([]);
    const [count_for_cwe, setCountForCwe] = useState(0);
    const [errors, setErrors] = useState([]);




    useEffect(() => {
        if (onComponentsUpdateforcwe) {
            onComponentsUpdateforcwe(componentsWithError);
        }
    }, [componentsWithError, onComponentsUpdateforcwe]);

   
   
   
    // const handleInputChangeWithError = (index, field, value) => {
    //     setComponentsWithError(prevComponents => {
    //         const updatedComponents = [...prevComponents];
    //         updatedComponents[index] = { ...updatedComponents[index], [field]: value };
    //         return updatedComponents;
    //     });
    // };

    const handleInputChangeWithError = (index, field, value) => {
        const trimmedValue = value.toUpperCase(); // Convert to uppercase
    
        // Only update if the length is within the limit
        if (trimmedValue.length <= 21) {
            setComponentsWithError(prevComponents => {
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
    

    const handleAddComponentWithError = () => {
        setCountForCwe(count_for_cwe + 1);
        setComponentsWithError(prevComponents => [
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

    const handleRemoveComponentWithError = (index) => {
        setComponentsWithError(prevComponents =>
            prevComponents.filter((_, i) => i !== index)
        );
        setCountForCwe(count_for_cwe - 1);
    };

    const validateSubBarcodeForCwe = (sub_barcode, index) => {
        const subBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}(-[A-Z]{2}\d{2})?$/;
        const isValid = subBarcodeRegex.test(sub_barcode);
        const updatedErrors = [...fieldErrors];
        updatedErrors[index] = isValid ? '' : 'Invalid Subbarcode';
        setFieldErrors(updatedErrors);
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


const validateSubBarcodeforcwe = (barcode, index) => {
        // Combined regex for sub bar code and barcode
        const subBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}(-[A-Z]{2}\d{2})?$/;

        // Check if barcode matches the combined pattern
        const isValid = subBarcodeRegex.test(barcode);
        const updatedErrors = [...errors];
        updatedErrors[index] = isValid ? '' : 'Invalid Subbarcode';
        setErrors(updatedErrors);
    };

    return (
<Grid item xs={12} sx={{ marginTop: '20px' }}>
    <Typography variant='h4' gutterBottom sx={{ fontSize: '1.5rem' }}>
        Components With Error
    </Typography>
    <CustomButton onClick={handleAddComponentWithError}>
        Add Item
    </CustomButton>
    {componentsWithError.map((component, index) => (
        <Box key={index} sx={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '8px', overflow: 'hidden',backgroundColor:'#f5f5f5' }}>
            <Typography variant='h6' gutterBottom>Component with Error {index + 1}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomInputLabel label="Enter Sub Bar Code" />
                    <CustomFormControl>
                        <CustomTextField
                            value={component.sub_barcode || ''}
                            onChange={(e) => {
                                handleInputChangeWithError(index, 'sub_barcode', e.target.value.toUpperCase());
                                validateSubBarcodeforcwe(e.target.value, index);
                            }}
                            error={Boolean(errors[index])}
                            helperText={errors[index]}
                            minLength={21}
                            maxLength={21}
                            placeholder="Enter your Sub Bar Code"
                        />
                    </CustomFormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CustomInputLabel label="Check Status" />
                    <CustomFormControl>
                        <CustomSelect
                            value={component.check_status || ''}
                            onChange={(e) => handleInputChangeWithError(index, 'check_status', e.target.value)}
                            options={cwe_check_status}
                        />
                    </CustomFormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CustomInputLabel label="Error Definition" />
                    <CustomFormControl>
                        <CustomSelect
                            value={component.error_definition || ''}
                            onChange={(e) => handleInputChangeWithError(index, 'error_definition', e.target.value)}
                            options={cwe_error_definition}
                        />
                    </CustomFormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CustomInputLabel label="Select Category" />
                    <CustomFormControl>
                        <CustomSelect
                            value={component.select_category || ''}
                            onChange={(e) => handleInputChangeWithError(index, 'select_category', e.target.value)}
                            options={cwe_select_category}
                        />
                    </CustomFormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <CustomInputLabel label="Change Status" />
                    <CustomFormControl>
                        <CustomSelect
                            value={component.change_status || ''}
                            onChange={(e) => handleInputChangeWithError(index, 'change_status', e.target.value)}
                            options={cwe_change_status}
                        />
                    </CustomFormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomInputLabel label="Remarks" />
                    <CustomFormControl>
                        <CustomTextField placeholder="Enter remarks here"
                            value={component.remarks}
                            onChange={(e) => handleInputChangeWithError(index, 'remarks', e.target.value)}
                            multiline
                            rows={4}
                        />
                    </CustomFormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomInputLabel label="Remarks for Operations" />
                    <CustomFormControl>
                        <CustomTextField  placeholder="Enter remarks for operations here"
                            value={component.remarks_for_operations}
                            onChange={(e) => handleInputChangeWithError(index, 'remarks_for_operations', e.target.value)}
                            multiline
                            rows={4}
                        />
                    </CustomFormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <CustomInputLabel label="Upload Files" />
                    <CustomFormControl>
                        <TextField
                            type="file"
                            inputProps={{ multiple: true }}
                            onChange={(e) => handleFileInputChangeWithError(index, e.target.files)}
                            fullWidth
                        />
                    </CustomFormControl>
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





    );
}

export default Cwe;