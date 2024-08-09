import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TextField, Button, IconButton, InputAdornment, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ReactPaginate from 'react-paginate';
import AccordionDrafts from './AccordionDrafts';
import '../css/Submitted.css'; // Import the new CSS file for styles

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#7c4dff',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          transition: 'all 0.3s',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(124, 77, 255, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px rgba(255, 64, 129, 0.2)',
          },
        },
      },
    },
  },
});

const Drafts = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const auditsPerPage = 10;

  useEffect(() => {
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
      axios.get('http://127.0.0.1:8000/api/auth/audit/save-draft/', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        setAudits(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch audits');
        setLoading(false);
      });
    } else {
      setError('No access token found');
      setLoading(false);
    }
  }, []);

  const handleDelete = async (auditId) => {
    const accessToken = Cookies.get('access_token');
    setLoading(true);

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/auth/audit/delete-draft/${auditId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 204) {
        // Remove the deleted audit from the state
        setAudits((prevAudits) => prevAudits.filter((audit) => audit.id !== auditId));
      }
    } catch (error) {
      console.error('Failed to delete audit', error);
      setError('Failed to delete audit');
    } finally {
      setLoading(false);
    }
  };

  const validateDate = (date) => {
    return !isNaN(Date.parse(date));
  };

  const filteredAudits = audits.filter(audit => {
    const auditDate = new Date(audit.created_at);
    const isWithinDateRange = 
      (!startDate || (validateDate(startDate) && auditDate >= new Date(startDate))) && 
      (!endDate || (validateDate(endDate) && auditDate <= new Date(endDate)));
    const matchesSearchTerm = 
      !searchTerm || (audit.barcode && audit.barcode.toLowerCase().includes(searchTerm.toLowerCase()));

    return isWithinDateRange && matchesSearchTerm;
  });

  const handleClear = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  const handleShowAll = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(0); // Reset to the first page
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * auditsPerPage;
  const currentPageData = filteredAudits.slice(offset, offset + auditsPerPage);
  const pageCount = Math.ceil(filteredAudits.length / auditsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper" sx={{overflow:'hidden !important'}}>
        <div className="headtitle">
          <div className="audit-count">
            Showing {currentPageData.length} out of {filteredAudits.length} audits
          </div>
          <h1>Drafts</h1>
          <form className="searchBar" id="searchBar">
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <TextField
                  variant="outlined"
                  placeholder="Search Cases..."
                  className="admin-search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  placeholder="Start Date"
                  type="date"
                  className="admin-search2"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  placeholder="End Date"
                  type="date"
                  className="admin-search2"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  className="admin-searchBtn"
                  // startIcon={<SearchIcon />}
                  style={{ borderRadius: '0.5rem' }}
                >
                  Search
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  className="admin-clearBtn"
                  // startIcon={<ClearIcon />}
                  style={{ borderRadius: '0.5rem' }}
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  className="admin-showAllBtn"
                  style={{ borderRadius: '0.5rem' }}
                  onClick={handleShowAll}
                >
                  Show All
                </Button>
              </Grid>
            </Grid>
          </form>
          <div className="underline"></div>
        </div>

        <div className="reverse">
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            currentPageData.map(audit => (
              <AccordionDrafts key={audit.barcode} audit={audit} onDelete={handleDelete} />
            ))
          )}
        </div>

        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </ThemeProvider>
  );
};

export default Drafts;