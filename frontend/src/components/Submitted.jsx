import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCases } from '../redux/actions';
import AccordionSection from './AccordionSection';
import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
    Switch,
    createTheme,
    ThemeProvider,
    Snackbar,
    Alert,
} from '@mui/material';
import { amber, grey } from '@mui/material/colors';
import { debounce } from 'lodash';

const Submitted = () => {
    const dispatch = useDispatch();
    const cases = useSelector(state => state.cases || []);
    const [filter, setFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortAttribute, setSortAttribute] = useState('submittedDate');
    const [sortOrder, setSortOrder] = useState('asc');
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true' || false;
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(fetchCases())
            .then(() => setLoading(false))
            .catch((err) => {
                setError('Failed to fetch cases');
                setLoading(false);
            });
    }, [dispatch]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    const debouncedFilterChange = useCallback(debounce(handleFilterChange, 300), []);

    const handleDateChange = (type, value) => {
        if (type === 'start') {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSortChange = (event) => {
        setSortAttribute(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', !darkMode);
    };

    const filteredCases = cases
        .filter(caseItem => caseItem.barcode.toLowerCase().includes(filter))
        .sort((a, b) => {
            if (sortAttribute === 'submittedDate') {
                return sortOrder === 'asc'
                    ? new Date(a.submittedDate) - new Date(b.submittedDate)
                    : new Date(b.submittedDate) - new Date(a.submittedDate);
            } else {
                return sortOrder === 'asc'
                    ? a.barcode.localeCompare(b.barcode)
                    : b.barcode.localeCompare(a.barcode);
            }
        })
        .slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#DA5527',
            },
            secondary: {
                main: darkMode ? amber[700] : amber[400],
            },
            background: {
                default: darkMode ? grey[900] : '#fff',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <header>
                    {/* Header code here */}
                </header>
                <Box my={4} textAlign="center">
                    <Typography variant="h3" component="h1" color="primary">
                        Submitted
                    </Typography>
                    <Switch checked={darkMode} onChange={handleDarkModeToggle} />
                    <Box component="form" my={2} display="flex" justifyContent="center" flexWrap="wrap">
                        <TextField
                            variant="outlined"
                            placeholder="Search Cases..."
                            onChange={debouncedFilterChange}
                            sx={{ m: 1, width: '250px', backgroundColor: 'white' }}
                        />
                        <TextField
                            type="date"
                            value={startDate}
                            onChange={(e) => handleDateChange('start', e.target.value)}
                            sx={{ m: 1, width: '150px', backgroundColor: 'white' }}
                        />
                        <TextField
                            type="date"
                            value={endDate}
                            onChange={(e) => handleDateChange('end', e.target.value)}
                            sx={{ m: 1, width: '150px', backgroundColor: 'white' }}
                        />
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Sort By</InputLabel>
                            <Select value={sortAttribute} onChange={handleSortChange}>
                                <MenuItem value="submittedDate">Date</MenuItem>
                                <MenuItem value="barcode">Barcode</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Order</InputLabel>
                            <Select value={sortOrder} onChange={handleSortOrderChange}>
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ m: 1, backgroundColor: '#DA5527', '&:hover': { backgroundColor: '#BB431C' } }}
                        >
                            Search
                        </Button>
                    </Box>
                </Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : error ? (
                    <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
                        <Alert onClose={() => setError(null)} severity="error">
                            {error}
                        </Alert>
                    </Snackbar>
                ) : (
                    <Grid container spacing={2}>
                        {filteredCases.map((caseItem, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <AccordionSection caseItem={caseItem} />
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Box display="flex" justifyContent="center" my={4}>
                    <Pagination
                        count={Math.ceil(cases.length / itemsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Submitted;