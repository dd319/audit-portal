// import React, { useState } from 'react';
// import { Paper, Typography, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import '../css/Accordion.css';

// const Accordion = ({ audit }) => {
//   const [isActive, setIsActive] = useState(false);

//   const toggleAccordion = () => {
//     setIsActive(!isActive);
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
//         </div>
//         <IconButton onClick={toggleAccordion} className="expand-icon">
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
//                   <TableCell>Remarks for Operations</TableCell>
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
//                   <TableCell>Audit Type</TableCell>
//                   <TableCell>Case Error</TableCell>
//                   <TableCell>Case Status</TableCell>
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
//                     <TableCell colSpan={7} align="center">No components with errors</TableCell>
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

// export default Accordion;

import React, { useState } from 'react';
import { Paper, Typography, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../css/Accordion.css';

const Accordion = ({ audit }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <Paper className={`accordion ${isActive ? 'active' : ''}`} elevation={3}>
      <div className="accordion-summary" onClick={toggleAccordion}>
        <div className="data">
          <div>
            <strong>Audit Type:</strong>
            <p className="audit_type">{audit?.audit_type || 'None'}</p>
          </div>
          <div>
            <strong>Barcode:</strong>
            <p className="bars">{audit?.barcode || 'None'}</p>
          </div>
          <div className="bigDet">
            <strong>Status:</strong>
            <p>{audit?.case_status || 'None'}</p>
          </div>
          <div className="bigDet">
            <strong>Submitted Date:</strong>
            <p className="date">{audit?.created_at || 'None'}</p>
          </div>
        </div>
        <IconButton onClick={toggleAccordion} className="expand-icon">
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <Collapse in={isActive} timeout="auto" unmountOnExit>
        <div className="accordion-details">
          {/* Case Errors Table */}
          <Typography variant="h6" className="table-title">Case Errors</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Final Error Category</TableCell>
                  <TableCell>Remarks for Audit</TableCell>
                  <TableCell>Remarks for Operations</TableCell>
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
          <Typography variant="h6" className="table-title">Components with Errors</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Sub-barcode</TableCell>
                  <TableCell>Check Status</TableCell>
                  <TableCell>Change Status</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
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
                      <TableCell>{component?.remarks || 'None'}</TableCell>
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
          <Typography variant="h6" className="table-title">Components without Errors</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sub-Barcode</TableCell>
                  <TableCell>Check Status</TableCell>
                  <TableCell>Status Change</TableCell>
                  <TableCell>Remarks for Audit</TableCell>
                  <TableCell>Remarks for Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audit?.componentsWithoutError?.length > 0 ? (
                  audit.componentsWithoutError.map((component, index) => (
                    <TableRow key={index}>
                      <TableCell>{component?.sub_barcode || 'None'}</TableCell>
                      <TableCell>{component?.check_status || 'None'}</TableCell>
                      <TableCell>{component?.change_status || 'None'}</TableCell>
                      <TableCell>{component?.remarks || 'None'}</TableCell>
                      <TableCell>{component?.remarks_for_operations || 'None'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No components without errors</TableCell>
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

export default Accordion;

