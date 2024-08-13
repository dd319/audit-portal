

// import React, { useState } from 'react';
// import {
//   Paper,
//   Typography,
//   Collapse,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import '../css/AccordDrafts.css';

// const AccordionDrafts = ({ audit, onEdit, onDelete }) => {
//   const [isActive, setIsActive] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [audits, setAudits] = useState([]);
//   const navigate = useNavigate();

//   const handleEdit = async (event, audit) => {
//     event.stopPropagation(); // Prevents the accordion from toggling
//     setLoading(true);
//     const accessToken = Cookies.get('access_token');

//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/auth/audit/update-audit/${audit.id}/`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }); 
//       console.log("Edit response:", response);

//       // Navigate to the Landing page with the audit data
//       navigate('/landing', { state: { auditData: response.data } });
//     } catch (error) {
//       console.error("Failed to edit audit", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (event, auditId) => {
//     event.stopPropagation(); // Prevents the accordion from toggling
//     setLoading(true);
//     const accessToken = Cookies.get('access_token');
  
//     console.log("Deleting audit with ID:", auditId);
  
//     try {
//       const response = await axios.delete(`http://127.0.0.1:8000/api/auth/audit/delete-draft/${auditId}/`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
  
//       console.log("Delete response:", response);
  
//       // Check if the response status is 204 (No Content)
//       if (response.status === 204) {
//         // Remove the audit from the state
//         setAudits((prevAudits) =>
//           prevAudits.filter((audit) => audit.id !== auditId)
//         );
//       }
//     } catch (error) {
//       console.error("Failed to delete audit", error);
//       console.log("Error response:", error.response);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleAccordion = () => {
//     setIsActive((prevActive) => !prevActive);
//   };

//   const handleDeleteConfirmation = async (auditId) => {
//     if (window.confirm('Are you sure you want to delete this draft?')) {
//       onDelete(auditId);
//     }
//   };

//   return (
//     <Paper className={`accordion ${isActive ? 'active' : ''}`} elevation={3}>
//       <div className="accordion-summary" onClick={toggleAccordion}>
//         <div className="data">
//           <div>
//             <strong>Audit Type:</strong>
//             <p className="audit_type">{audit?.audit_type || 'None'}</p>
//           </div>
//           <div>
//             <strong>Barcode:</strong>
//             <p className="bars">{audit?.barcode || 'None'}</p>
//           </div>
//           <div className="bigDet">
//             <strong>Status:</strong>
//             <p>{audit?.case_status || 'None'}</p>
//           </div>
//           <div className="bigDet">
//             <strong>Submitted Date:</strong>
//             <p className="date">{audit?.created_at || 'None'}</p>
//           </div>
//           <div>
//             <IconButton onClick={(event) => handleEdit(event, audit)} disabled={loading}>
//               <EditIcon />
//             </IconButton>
//             <IconButton onClick={() => handleDeleteConfirmation(audit.id)}>
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         </div>
//         <IconButton className="expand-icon">
//           <ExpandMoreIcon />
//         </IconButton>
//       </div>
//       <Collapse in={isActive} timeout="auto" unmountOnExit>
//         <div className="accordion-details">
//           {/* Case Errors Table */}
//           <Typography variant="h6" className="table-title">Case Errors</Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Category</TableCell>
//                   <TableCell>Description</TableCell>
//                   <TableCell>Final Error Category</TableCell>
//                   <TableCell>Remarks for Audit</TableCell>
//                   <TableCell>Remarks for Ops</TableCell>
//                   <TableCell>Attached File</TableCell>
//                   <TableCell>Auditor's Error</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {audit?.error_cases?.length > 0 ? (
//                   audit.error_cases.map((error, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{error?.select_category || 'None'}</TableCell>
//                       <TableCell>{error?.error_definition || 'None'}</TableCell>
//                       <TableCell>{error?.final_error_category || 'None'}</TableCell>
//                       <TableCell>{error?.remarks || 'None'}</TableCell>
//                       <TableCell>{error?.remarks_for_operations || 'None'}</TableCell>
//                       <TableCell>
//                         {error?.files?.length > 0 ? (
//                           error.files.map((file) => (
//                             <a key={file.id} href={file.file} target="_blank" rel="noopener noreferrer">
//                               {file.file.split('/').pop()}
//                             </a>
//                           ))
//                         ) : 'None'}
//                       </TableCell>
//                       <TableCell>{error?.auditor_error || 'None'}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center">No errors found</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Components with Errors Table */}
//           <Typography variant="h6" className="table-title">Components with Errors</Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Sub-barcode</TableCell>
//                   <TableCell>Check Status</TableCell>
//                   <TableCell>Change Status</TableCell>
//                   <TableCell>Category</TableCell>
//                   <TableCell>Description</TableCell>
//                   <TableCell>Remarks</TableCell>
//                   <TableCell>Remarks for Operations</TableCell>
//                   <TableCell>Attached File</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {audit?.componentsWithError?.length > 0 ? (
//                   audit.componentsWithError.map((component, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{component?.sub_barcode || 'None'}</TableCell>
//                       <TableCell>{component?.check_status || 'None'}</TableCell>
//                       <TableCell>{component?.change_status || 'None'}</TableCell>
//                       <TableCell>{component?.select_category || 'None'}</TableCell>
//                       <TableCell>{component?.error_definition || 'None'}</TableCell>
//                       <TableCell>{component?.remarks || 'None'}</TableCell>
//                       <TableCell>{component?.remarks_for_operations || 'None'}</TableCell>
//                       <TableCell>
//                         {component?.files?.length > 0 ? (
//                           component.files.map((file) => (
//                             <a key={file.id} href={file.file} target="_blank" rel="noopener noreferrer">
//                               {file.file.split('/').pop()}
//                             </a>
//                           ))
//                         ) : 'None'}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={6} align="center">No components with errors</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Components without Errors Table */}
//           <Typography variant="h6" className="table-title">Components without Errors</Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Sub-Barcode</TableCell>
//                   <TableCell>Check Status</TableCell>
//                   <TableCell>Status Change</TableCell>
//                   <TableCell>Remarks for Audit</TableCell>
//                   <TableCell>Remarks for Operations</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {audit?.componentsWithoutError?.length > 0 ? (
//                   audit.componentsWithoutError.map((component, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{component?.sub_barcode || 'None'}</TableCell>
//                       <TableCell>{component?.check_status || 'None'}</TableCell>
//                       <TableCell>{component?.change_status || 'None'}</TableCell>
//                       <TableCell>{component?.remarks || 'None'}</TableCell>
//                       <TableCell>{component?.remarks_for_operations || 'None'}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">No components without errors</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//         </div>
//       </Collapse>
//     </Paper>
//   );
// };

// export default AccordionDrafts;

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../css/AccordDrafts.css';

const AccordionDrafts = ({ audit, onEdit, onDelete }) => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audits, setAudits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAudits = JSON.parse(localStorage.getItem('audits')) || [];
    setAudits(savedAudits);
  }, []);

  useEffect(() => {
    localStorage.setItem('audits', JSON.stringify(audits));
  }, [audits]);

  const handleEdit = async (event, audit) => {
    event.stopPropagation(); // Prevents the accordion from toggling
    setLoading(true);
    const accessToken = Cookies.get('access_token');

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/auth/audit/update-audit/${audit.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Edit response:', response);

      // Store audit data in localStorage
      localStorage.setItem('auditData', JSON.stringify(response.data));

      // Navigate to the EditDraft page with a query parameter
      navigate('/editdraft?fromDraft=true');
    } catch (error) {
      console.error('Failed to edit audit', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (event, auditId) => {
    event.stopPropagation(); // Prevents the accordion from toggling
    setLoading(true);
    const accessToken = Cookies.get('access_token');

    console.log('Deleting audit with ID:', auditId);

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/auth/audit/delete-draft/${auditId}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Delete response:', response);

      if (response.status === 204) {
        // Remove the audit from the state
        setAudits((prevAudits) =>
          prevAudits.filter((audit) => audit.id !== auditId)
        );
      }
    } catch (error) {
      console.error('Failed to delete audit', error);
      console.log('Error response:', error.response);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = () => {
    setIsActive((prevActive) => !prevActive);
  };

  const handleDeleteConfirmation = async (auditId) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      onDelete(auditId);
    }
  };

  return (
    <Paper style={{ marginBottom: '16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          padding: '22px',
        }}
        onClick={toggleAccordion}
      >
        <div style={{ display: 'flex', flex: 1, gap: '26px' }}>
          <div style={{ flex: 1 }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>Audit Type:</Typography>
            <Typography variant="body2">{audit?.audit_type || 'None'}</Typography>
          </div>
          <div style={{ flex: 1 }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>Barcode:</Typography>
            <Typography variant="body2">{audit?.barcode || 'None'}</Typography>
          </div>
          <div style={{ flex: 1 }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>Status:</Typography>
            <Typography variant="body2">{audit?.case_status || 'None'}</Typography>
          </div>
          <div style={{ flex: 1 }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>Submitted Date:</Typography>
            <Typography variant="body2">{audit?.created_at || 'None'}</Typography>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton onClick={(event) => handleEdit(event, audit)} disabled={loading} style={{ color: '#4caf50' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteConfirmation(audit.id)} style={{ color: '#f44336' }}>
            <DeleteIcon />
          </IconButton>
          <IconButton style={{ color: '#2196f3' }}>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
      <Collapse in={isActive} timeout="auto" unmountOnExit>
        <div style={{ padding: '16px' }}>
          {/* Case Errors Table */}
          <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: 'bold' }}>Case Errors</Typography>
          <TableContainer component={Paper} style={{ marginBottom: '16px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Final Error Category</TableCell>
                  <TableCell>Remarks for Audit</TableCell>
                  <TableCell>Remarks for Ops</TableCell>
                  <TableCell>Attached File</TableCell>
                  <TableCell>Auditor's Error</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audit?.error_cases?.length > 0 ? (
                  audit.error_cases.map((error, index) => (
                    <TableRow key={index}>
                      <TableCell>{error?.select_category || 'None'}</TableCell>
                      <TableCell>{error?.error_definition || 'None'}</TableCell>
                      <TableCell>{error?.final_error_category || 'None'}</TableCell>
                      <TableCell>{error?.remarks || 'None'}</TableCell>
                      <TableCell>{error?.remarks_for_operations || 'None'}</TableCell>
                      <TableCell>
                        {error?.files?.length > 0 ? (
                          error.files.map((file) => (
                            <a key={file.id} href={file.file} target="_blank" rel="noopener noreferrer">
                              {file.file.split('/').pop()}
                            </a>
                          ))
                        ) : 'None'}
                      </TableCell>
                      <TableCell>{error?.auditor_error || 'None'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No errors found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Components with Errors Table */}
          <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: 'bold' }}>Components with Errors</Typography>
          <TableContainer component={Paper} style={{ marginBottom: '16px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sub-barcode</TableCell>
                  <TableCell>Audit Type</TableCell>
                  <TableCell>Case Error</TableCell>
                  <TableCell>Case Status</TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Remarks for Operations</TableCell>
                  <TableCell>Attached File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audit?.componentsWithError?.length > 0 ? (
                  audit.componentsWithError.map((component, index) => (
                    <TableRow key={index}>
                      <TableCell>{component?.sub_barcode || 'None'}</TableCell>
                      <TableCell>{component?.check_status || 'None'}</TableCell>
                      <TableCell>{component?.change_status || 'None'}</TableCell>
                      <TableCell>{component?.select_category || 'None'}</TableCell>
                      <TableCell>{component?.error_definition || 'None'}</TableCell>
                      <TableCell>{component?.remarks_for_operations || 'None'}</TableCell>
                      <TableCell>
                        {component?.files?.length > 0 ? (
                          component.files.map((file) => (
                            <a key={file.id} href={file.file} target="_blank" rel="noopener noreferrer">
                              {file.file.split('/').pop()}
                            </a>
                          ))
                        ) : 'None'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No components with errors</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Components without Errors Table */}
          <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: 'bold' }}>Components without Errors</Typography>
          <TableContainer component={Paper} style={{ marginBottom: '16px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sub-barcode</TableCell>
                  <TableCell>Audit Type</TableCell>
                  <TableCell>Case Error</TableCell>
                  <TableCell>Case Status</TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Remarks for Operations</TableCell>
                  <TableCell>Attached File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audit?.componentsWithoutError?.length > 0 ? (
                  audit.componentsWithoutError.map((component, index) => (
                    <TableRow key={index}>
                      <TableCell>{component?.sub_barcode || 'None'}</TableCell>
                      <TableCell>{component?.check_status || 'None'}</TableCell>
                      <TableCell>{component?.change_status || 'None'}</TableCell>
                      <TableCell>{component?.select_category || 'None'}</TableCell>
                      <TableCell>{component?.error_definition || 'None'}</TableCell>
                      <TableCell>{component?.remarks_for_operations || 'None'}</TableCell>
                      <TableCell>
                        {component?.files?.length > 0 ? (
                          component.files.map((file) => (
                            <a key={file.id} href={file.file} target="_blank" rel="noopener noreferrer">
                              {file.file.split('/').pop()}
                            </a>
                          ))
                        ) : 'None'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No components without errors</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Collapse>
    </Paper>
  );
};

export default AccordionDrafts;