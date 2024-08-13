

// import React, { useState, useEffect } from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Landing from './components/Landing';
// import Unauthorized from './components/Unauthorized';
// import Submitted from './components/Submitted';
// import Drafts from './components/Drafts';
// import AuditQueryPortal from './components/AuditQueryPortal';
// import AdminPanel from './components/AdminPanel';
// import AuditSampling from './components/AuditSampling';
// import Configuration from './components/Configuration';
// import Navigation from './components/Navigation';
// import Cookies from 'js-cookie';

// const PrivateRoute = ({ children }) => {
//   const accessToken = Cookies.get('access_token');
//   return accessToken ? children : <Navigate to="/unauthorized" />;
// };

// const App = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     // Load theme preference from local storage
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setDarkMode(savedTheme === 'dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     setDarkMode((prevMode) => {
//       const newMode = !prevMode;
//       document.body.className = newMode ? 'dark' : 'light'; // Ensure body class is updated
//       localStorage.setItem('theme', newMode ? 'dark' : 'light');
//       return newMode;
//     });
//   };

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? 'dark' : 'light',
//     },
//   });

//   const location = useLocation();

//   return (
//     <ThemeProvider theme={theme}>
//       {location.pathname !== '/' && (
//         <Navigation
//           userRole="admin"
//           draftsCount={3}
//           toggleTheme={toggleTheme}
//           darkMode={darkMode}
//         />
//       )}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />
//         <Route path="/landing" element={<PrivateRoute><Landing /></PrivateRoute>} />
//         <Route path="/submitted" element={<PrivateRoute><Submitted /></PrivateRoute>} />
//         <Route path="/drafts" element={<PrivateRoute><Drafts /></PrivateRoute>} />
//         <Route path="/audit-query-portal" element={<PrivateRoute><AuditQueryPortal /></PrivateRoute>} />
//         <Route path="/admin-panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
//         <Route path="/audit-sampling" element={<PrivateRoute><AuditSampling /></PrivateRoute>} />
//         <Route path="/configuration" element={<PrivateRoute><Configuration /></PrivateRoute>} />
//       </Routes>
//     </ThemeProvider>
//   );
// };
  // {/* <Route path="/landing" element={<PrivateRoute><Landing /></PrivateRoute>} /> */}
  //       {/* <Route path="/submitted" element={<PrivateRoute><Submitted /></PrivateRoute>} />
  //       <Route path="/drafts" element={<PrivateRoute><Drafts /></PrivateRoute>} />
  //       <Route path="/audit-query-portal" element={<PrivateRoute><AuditQueryPortal /></PrivateRoute>} />
  //       <Route path="/admin-panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
  //       <Route path="/audit-sampling" element={<PrivateRoute><AuditSampling /></PrivateRoute>} />
  //       <Route path="/configuration" element={<PrivateRoute><Configuration /></PrivateRoute>} /> */}
  // const PrivateRoute = ({ children }) => {
//   const accessToken = Cookies.get('access_token');
//   return accessToken ? children : <Navigate to="/unauthorized" />;
// };
// export default App;

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/Landing';
import Unauthorized from './components/Unauthorized';
import Submitted from './components/Submitted';
import Drafts from './components/Drafts';
import AuditQueryPortal from './components/AuditQueryPortal';
import AdminPanel from './components/AdminPanel';
import AuditSampling from './components/AuditSampling';
import Configuration from './components/Configuration';
import Navigation from './components/Navigation';
import Cookies from 'js-cookie';
import PrivateRoute from './PrivateRoute';
import EditDraft from './components/EditDraft';



const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load theme preference from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.className = newMode ? 'dark' : 'light'; // Ensure body class is updated
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      {location.pathname !== '/'  && location.pathname !== '/unauthorized' && (
        <Navigation
          userRole="admin"
          draftsCount={3}
          toggleTheme={toggleTheme}
          darkMode={darkMode}
        />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/landing" element={<Landing />}/>
          <Route path="/drafts" element={<Drafts />}/>
          <Route path="/editdraft" element={<EditDraft />} />
          <Route path="/submitted" element={<Submitted />}/>
          
          <Route path="/audit-query-portal" element={<AuditQueryPortal />}/>
          <Route path="/admin-panel" element={<AdminPanel  />}/>
          <Route path="/audit-sampling" element={<AuditSampling />}/>
          <Route path="/configuration" element={<Configuration />}/>
        </Route>
      
      </Routes>
    </ThemeProvider>
  );
};

export default App;