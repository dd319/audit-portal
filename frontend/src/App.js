import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/landing';
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
import SubmitDisplay from './components/SubmitDisplay'
import DraftDisplay from './components/DraftDisplay'




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
          <Route path="/submitted" element={<Submitted />}/>
          <Route path="/audit-query-portal" element={<AuditQueryPortal />}/>
          <Route path="/admin-panel" element={<AdminPanel  />}/>
          <Route path="/audit-sampling" element={<AuditSampling />}/>
          <Route path="/configuration" element={<Configuration />}/>
          <Route path="/submitdisplay" element={<SubmitDisplay />}/>
          <Route path="/draftdisplay" element={<DraftDisplay />}/>
        </Route>
      
      </Routes>
    </ThemeProvider>
  );
};

export default App;