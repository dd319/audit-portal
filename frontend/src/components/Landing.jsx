
import CustomButton from "../CustomButton";
import '../css/styles.css';
import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Box,
    Paper,
    Snackbar,
    Alert, Divider
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

import {
    audit_type_check,
    audit_type_status,
    audit_type_is_there_any_case_error,
    case_select_category,
    case_error_definition,
    case_final_error_category,
} from "./options";
import Cwe from "./Cwe";
import Cwithoute from "./Cwithoute";
import CustomInputLabel from "./CustomInputLabel";
import CustomFormControl from "./CustomFormControl";
import CustomSelect from "./CustomSelect";
import CustomTextField from "./CustomTextField";
import { Link } from 'react-router-dom'
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Landing = () => {
    const [barcode, setBarcode] = useState("");
    const [audit_type, setAuditType] = useState("");
    const [case_error, setCaseError] = useState("");
    const [case_status, setCaseStatus] = useState("");
    const [componentsWithError, setComponentsWithError] = useState([]);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState([]);
    const [isRequiblack, setIsRequiblack] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [select_category, selectCategory] = useState("");
    const [sub_barcode, setSubbarcode] = useState("");
    const [check_status, setCheckStatus] = useState("");
    const [change_status, setChangeStatus] = useState("");
    const [error_definition, setErrorDefinition] = useState("");

    const [count_for_cwe, setcountforcwe] = useState(0);
    const check_counter_for_cwe_string = count_for_cwe.toString();
    const [count_for_cwithoute, setcountforcwithoute] = useState(0);
    const check_counter_for_cwithoute_string = count_for_cwithoute.toString();
    const [count_for_errorcase, setcountforerrorcase] = useState(0);
    const check_counter_for_errorcase_string = count_for_errorcase.toString();

    useEffect(() => {
        if (case_error === "yes" && addNewItem.length === 0) {
            handleAddNewItem();
        } else if (case_error === "no" || case_error === "incomplete") {
            setAddNewItem([]);
        }
    }, [case_error]);

    const validateBarcode = (barcode) => {
        const partialBarcodeRegex = /^([A-Z]\d{3}|[A-Z]{3}\d)-\d{2}\d{2}-\d{6,7}$/;
        if (partialBarcodeRegex.test(barcode)) {
            return true;
        }
        return false;
    };

    const accessToken = Cookies.get("access_token");

    const handleSaveOrSubmit = async (e, status) => {
        e.preventDefault();
        const formData = {
            barcode,
            audit_type,
            case_error,
            case_status,
            status: status,
            created_at: new Date().toISOString().split("T")[0],
            error_cases: (addNewItem || []).map((item) => ({
                select_category: item.select_category,
                error_definition: item.errorDefinition,
                final_error_category: item.finalErrorCategory,
                remarks: item.remarks,
                remarks_for_operations: item.remarks_for_operations,
                files: (item.file || []).map((f) => ({
                    file: f.file,
                })),
                counter1: check_counter_for_errorcase_string,
            })),
            componentsWithError: (componentsWithError || []).map((component) => ({
                select_category: component.select_category,
                sub_barcode: component.sub_barcode,
                change_status: component.change_status,
                check_status: component.check_status,
                remarks: component.remarks,
                error_definition: component.error_definition,
                remarks_for_operations: component.remarks_for_operations,
                files: (component.file || []).map((f) => ({
                    file: f.file,
                })),
                counter2: check_counter_for_cwe_string,
            })),
            componentsWithoutError: (componentsWithoutError || []).map(
                (component) => ({
                    sub_barcode: component.sub_barcode,
                    remarks: component.remarks,
                    remarks_for_operations: component.remarks_for_operations,
                    counter3: check_counter_for_cwithoute_string,
                    check_status: component.check_status,
                    change_status: component.change_status,
                })
            ),
        };

        localStorage.setItem("formData", JSON.stringify(formData));
        console.log({ formData });

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/audit/",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!barcode || !audit_type || !case_error || !case_status) {
            setSnackbarOpen(true);
            return;
        }
        if (!validateBarcode(barcode)) {
            alert("Please fill in the correct barcode.");
            return;
        }
        handleSaveOrSubmit(e, "submitted");
        setIsRequiblack(true);
    };

    const handleSave = (e) => {
        handleSaveOrSubmit(e, "draft");
        setIsRequiblack(false);
        alert("Form Saved Successfully");
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // const handleInpChange = (e) => {
    //     setBarcode(e.target.value.toUpperCase());
    //     if (!validateBarcode(e.target.value)) {
    //         setError("Invalid barcode");
    //     } else {
    //         setError("");
    //     }
    // };

    const handleInpChange = (e) => {
        const newValue = e.target.value.toUpperCase();

        // Check if the length of newValue is within the limit
        if (newValue.length <= 16) {
            setBarcode(newValue);

            // Validate the barcode
            if (!validateBarcode(newValue)) {
                setError("Invalid barcode");
            } else {
                setError("");
            }
        } else {
            // Optionally, set an error message if you want to inform the user
            // setError("Barcode cannot exceed 16 characters");
        }
    };

    const handleAuditChange = (e) => setAuditType(e.target.value);
    const handleCaseErrorChange = (e) => setCaseError(e.target.value);
    const handleCaseStatusChange = (e) => setCaseStatus(e.target.value);

    const [componentsWithoutError, setComponentsWithoutError] = useState([]);
    const [addNewItem, setAddNewItem] = useState([]);

    const handleAddNewItem = () => {
        setcountforerrorcase(count_for_errorcase + 1);
        setAddNewItem([
            ...addNewItem,
            {
                select_category: "",
                errorDefinition: "",
                finalErrorCategory: "",
                remarks: "",
                remarks_for_operations: "",
                file: null,
            },
        ]);
    };

    const handleInputnewchange = (index, field, value) => {
        const updatedItems = addNewItem.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setAddNewItem(updatedItems);
    };

    const handleFileChange = async (index, files) => {
        const updatedComponents = [...addNewItem];
        const filesArray = Array.from(files);
        const base64Files = await Promise.all(
            filesArray.map(async (file) => ({
                file: await convertToBase64forcaseerror(file),
            }))
        );

        updatedComponents[index]["file"] = base64Files;
        setAddNewItem(updatedComponents);
    };

    const convertToBase64forcaseerror = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleRemoveNewItem = (index) => {
        setcountforerrorcase(count_for_errorcase - 1);
        const updatedItems = addNewItem.filter((_, i) => i !== index);
        setAddNewItem(updatedItems);
    };

    const handleComponentsUpdate = (updatedComponents) => {
        setComponentsWithoutError(updatedComponents);
    };

    const handleComponentsUpdateforcwe = (updatedComponents) => {
        setComponentsWithError(updatedComponents);
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    padding: "40px 0",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        padding: "20px",
                        width: "100%",
                        maxWidth: "1400px",
                        display: "flex",
                        gap: "20px",
                        overflow: "hidden",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        margin: "20px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    {/* Sidebar Section */}
                    <Box
                        sx={{
                            width: { xs: '100%', sm: '18%' },
                            padding: '20px',
                            borderRight: '1px solid #ddd',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            height: '100vh',
                            overflowY: 'auto',
                        }}
                    >
                        <Typography variant="h6" >
                            Audit Portal
                        </Typography>
                        <Divider sx={{ marginBottom: '10px' }} />
                        <Link to="/drafts" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                {/* <HomeIcon sx={{ marginRight: '10px', color: 'black' }} /> */}
                                <DraftsIcon sx={{ marginRight: '10px', color: 'black' }} />
                                <Typography variant="body1" sx={{ color: 'black' }}>
                                    Drafts
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/submitted" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                <SendIcon sx={{ marginRight: '10px', color: 'black' }} />

                                <Typography variant="body1" sx={{ color: 'black' }}>
                                    Submitted
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/admin-panel" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                <AdminPanelSettingsIcon sx={{ marginRight: '10px', color: 'black' }} />

                                <Typography variant="body1" sx={{ color: 'black' }}>
                                    Admin Panel
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/audit-query-portal" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >

                                <QueryBuilderIcon sx={{ marginRight: '10px', color: 'black' }} />
                                <Typography variant="body1" sx={{ color: 'black' }}>
                                    Audit Query Portal
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/audit-sampling" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                <AssessmentIcon sx={{ marginRight: '10px', color: 'black' }} />

                                <Typography variant="body1" sx={{ color: 'black' }}>
                                    Audit Sampling
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/configuration" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                <CrisisAlertIcon sx={{ marginRight: '10px', color: 'black' }} />

                                <Typography variant="body1" sx={{ color: 'black' }}>
                                    Configuration
                                </Typography>
                            </Box>
                        </Link>
                    </Box>


                    {/* Main Form Section */}
                    <Box sx={{ width: "82%" }}>
                        <Box sx={{ textAlign: 'center', marginBottom: '40px', textTransform: 'uppercase !important' }}>
                            <Typography variant="h5" gutterBottom>
                                BASE FORM DETAILS
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={3}>
                                    <CustomInputLabel label="Type of Audit" />
                                    <CustomFormControl>
                                        <CustomSelect
                                            value={audit_type}
                                            onChange={handleAuditChange}
                                            options={audit_type_check}
                                        />
                                    </CustomFormControl>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <CustomInputLabel label="Barcode" />
                                    <CustomFormControl>
                                        <CustomTextField
                                            value={barcode}
                                            onChange={handleInpChange}
                                            error={Boolean(error)}
                                            helperText={error}
                                            placeholder="Enter your text here"

                                        />



                                    </CustomFormControl>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <CustomInputLabel label="Status" />
                                    <CustomFormControl>
                                        <CustomSelect
                                            value={case_status}
                                            onChange={handleCaseStatusChange}
                                            options={audit_type_status}
                                        />
                                    </CustomFormControl>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <CustomInputLabel label="Case Error" />
                                    <CustomFormControl>
                                        <CustomSelect
                                            value={case_error}
                                            onChange={handleCaseErrorChange}
                                            options={audit_type_is_there_any_case_error}
                                        />
                                    </CustomFormControl>
                                </Grid>
                            </Grid>

                            {/* Case Error Items */}
                            <Grid container spacing={4} sx={{ marginTop: "20px" }}>
                                {addNewItem.map((item, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box
                                            sx={{
                                                border: "1px solid #ddd",
                                                borderRadius: "8px",
                                                padding: "16px",
                                                backgroundColor: "#f5f5f5",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            <Typography variant="h6" gutterBottom>
                                                Case Error {index + 1}
                                            </Typography>
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} sm={4}>
                                                    <CustomInputLabel label="Select Category" />
                                                    <CustomFormControl>
                                                        <CustomSelect
                                                            value={item.select_category}
                                                            onChange={(e) => handleInputnewchange(index, 'select_category', e.target.value)}
                                                            options={case_select_category}
                                                        />
                                                    </CustomFormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <CustomInputLabel label="Error Definition" />
                                                    <CustomFormControl>
                                                        <CustomSelect
                                                            value={item.errorDefinition || ''}
                                                            onChange={(e) => handleInputnewchange(index, 'errorDefinition', e.target.value)}
                                                            options={case_error_definition}
                                                        />
                                                    </CustomFormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <CustomInputLabel label="Final Error Category" />
                                                    <CustomFormControl>
                                                        <CustomSelect
                                                            value={item.finalErrorCategory || ''}
                                                            onChange={(e) => handleInputnewchange(index, 'finalErrorCategory', e.target.value)}
                                                            options={case_final_error_category}
                                                        />
                                                    </CustomFormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <CustomInputLabel label="Remarks" />
                                                    <CustomFormControl>
                                                        <CustomTextField
                                                            value={item.remarks}
                                                            onChange={(e) => handleInputnewchange(index, "remarks", e.target.value)}
                                                            multiline
                                                            rows={4}
                                                            placeholder="Enter remarks here"
                                                        />
                                                    </CustomFormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <CustomInputLabel label="Remarks for Operations" />
                                                    <CustomFormControl>
                                                        <CustomTextField
                                                            value={item.remarks_for_operations}
                                                            onChange={(e) => handleInputnewchange(index, "remarks_for_operations", e.target.value)}
                                                            multiline
                                                            rows={4}
                                                            placeholder="Enter remarks for operations here"
                                                        />
                                                    </CustomFormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <CustomFormControl>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            onChange={(e) => handleFileChange(index, e.target.files)}
                                                            style={{ width: "100%", border: "1px solid #ddd", padding: "8px", borderRadius: "4px" }}
                                                        />
                                                    </CustomFormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2} alignItems="center">
                                                        <Grid item>
                                                            <CustomButton
                                                                onClick={() => handleRemoveNewItem(index)}
                                                                variant="outlined"
                                                                color="error"
                                                                sx={{ marginBottom: "20px", marginRight: "10px" }}
                                                            >
                                                                Remove Item
                                                            </CustomButton>
                                                        </Grid>
                                                        <Grid item>
                                                            <CustomButton
                                                                onClick={handleAddNewItem}
                                                                sx={{ marginBottom: "20px" }}
                                                            >
                                                                Add Item
                                                            </CustomButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Additional Components */}
                            <Cwe onComponentsUpdateforcwe={handleComponentsUpdateforcwe} />

                            <Cwithoute onComponentsUpdate={handleComponentsUpdate} />

                            {/* Submit Button */}
                            <Grid
                                container
                                item
                                xs={12}
                                spacing={2}
                                sx={{ display: "flex" }}
                            >
                                <Grid item>
                                    {" "}
                                    <CustomButton type="submit">Submit</CustomButton>
                                </Grid>
                                <Grid item>
                                    {" "}
                                    <CustomButton onClick={handleSave}>Save</CustomButton>
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
                    </Box>
                </Paper>
            </Box>
        </>




    );
};

export default Landing;