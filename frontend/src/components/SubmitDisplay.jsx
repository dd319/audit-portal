// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Divider from '@mui/material/Divider';
// import Paper from '@mui/material/Paper';
// import Pagination from '@mui/material/Pagination';

// const AccordionWithData = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15; // Number of items per page

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const accessToken = Cookies.get('access_token');
//         console.log("Access Token:", accessToken);

//         const response = await axios.get('http://127.0.0.1:8000/api/auth/user-audits/', {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           }
//         });

//         setData(response.data);
//       } catch (error) {
//         setError(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   if (error) {
//     return <Box sx={{ p: 3, bgcolor: '#ffdddd', borderRadius: 2 }}>Error: {error.message}</Box>;
//   }

//   if (!data) {
//     return <Box sx={{ p: 3, textAlign: 'center' }}>Loading...</Box>;
//   }

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <Box sx={{ p: 3 }}>
//       {currentItems.length > 0 ? (
//         currentItems.map(item => (
//           <Accordion key={item.id} sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${item.id}-content`}
//               id={`panel-${item.id}-header`}
//               sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #ddd' }}
//             >
//               <Box sx={{ width: '100%' }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={3}>
//                     <Typography variant="h6">
//                       <strong>Audit Type:</strong> {item.audit_type}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <Typography variant="h6">
//                       <strong>Barcode:</strong> {item.barcode}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <Typography variant="h6">
//                       <strong>Status:</strong> {item.case_status}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <Typography variant="h6">
//                       <strong>Submitted Date:</strong> {item.created_at}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Box sx={{ width: '100%', p: 2 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="body1" sx={{ mb: 1 }}>
//                       <strong>Case Error:</strong> {item.case_error}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="body1" sx={{ mb: 1 }}>
//                       <strong>Status:</strong> {item.status}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   <strong>Error Cases:</strong>
//                 </Typography>
//                 {item.error_cases.length > 0 ? (
//                   <Grid container spacing={2}>
//                     {item.error_cases.map((errorCase) => (
//                       <Grid item xs={12} sm={6} key={errorCase.id}>
//                         <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Audit:</strong> {errorCase.select_category}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Error Definition:</strong> {errorCase.error_definition}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Final Error Category:</strong> {errorCase.final_error_category}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Remarks:</strong> {errorCase.remarks}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Remarks for Operations:</strong> {errorCase.remarks_for_operations}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 ) : (
//                   <Typography>No error cases available</Typography>
//                 )}
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   <strong>Components With Error:</strong>
//                 </Typography>
//                 {item.componentsWithError.length > 0 ? (
//                   <Grid container spacing={2}>
//                     {item.componentsWithError.map((component) => (
//                       <Grid item xs={12} sm={6} key={component.id}>
//                         <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Sub Barcode:</strong> {component.sub_barcode}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Audit Type:</strong> {component.audit_type}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Check Status:</strong> {component.check_status}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Change Status:</strong> {component.change_status}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Select Category:</strong> {component.select_category}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Error Definition:</strong> {component.error_definition}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Remarks:</strong> {component.remarks}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Remarks for Operations:</strong> {component.remarks_for_operations}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 ) : (
//                   <Typography>No components with error available</Typography>
//                 )}
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" sx={{ mb: 2 }}>
//                   <strong>Components Without Error:</strong>
//                 </Typography>
//                 {item.componentsWithoutError.length > 0 ? (
//                   <Grid container spacing={2}>
//                     {item.componentsWithoutError.map((component) => (
//                       <Grid item xs={12} sm={6} key={component.id}>
//                         <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Sub Barcode:</strong> {component.sub_barcode}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Check Status:</strong> {component.check_status}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Change Status:</strong> {component.change_status}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Remarks:</strong> {component.remarks}
//                           </Typography>
//                           <Typography variant="body2" sx={{ mb: 1 }}>
//                             <strong>Remarks for Operations:</strong> {component.remarks_for_operations}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 ) : (
//                   <Typography>No components without error available</Typography>
//                 )}
//               </Box>
//             </AccordionDetails>
//           </Accordion>
//         ))
//       ) : (
//         <Typography>No data available.</Typography>
//       )}
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <Pagination
//           count={Math.ceil(data.length / itemsPerPage)}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default AccordionWithData;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/auth/user-audits/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <p>User: {item.user}</p>

            {item.error_cases && item.error_cases.map((errorCase, index) => (
              <div key={index}>
                <h2>Error Cases</h2>
                {errorCase.files && errorCase.files.map(file => (
                  <div key={file.id}>
                    <p>File ID: {file.id}</p>
                    <p>File URL: <a href={file.file} target="_blank" rel="noopener noreferrer">{file.file}</a></p>
                    <p>Uploaded At: {file.uploaded_at}</p>
                  </div>
                ))}
              </div>
            ))}

            {item.componentsWithError && item.componentsWithError.map((componentWithError, index) => (
              <div key={index}>
                <h2>Components With Error</h2>
                {componentWithError.files && componentWithError.files.map(file => (
                  <div key={file.id}>
                    <p>File ID: {file.id}</p>
                    <p>File URL: <a href={file.file} target="_blank" rel="noopener noreferrer">{file.file}</a></p>
                    <p>Uploaded At: {file.uploaded_at}</p>
                  </div>
                ))}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetchingComponent;

