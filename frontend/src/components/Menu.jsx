import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Badge } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Menu = ({ userRole, draftsCount }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { text: 'Drafts', icon: <DraftsIcon />, route: '/drafts', showBadge: true },
    { text: 'Submitted', icon: <SendIcon />, route: '/submitted' },
    { text: 'Admin Panel', icon: <AdminPanelSettingsIcon />, route: '/admin-panel', adminOnly: true },
    { text: 'Audit Query Portal', icon: <QueryBuilderIcon />, route: '/audit-query-portal' },
    { text: 'Audit Sampling', icon: <AssessmentIcon />, route: '/audit-sampling' },
    { text: 'Configuration', icon: <CrisisAlertIcon />, route: '/configuration' },
    { text: 'Back To Form', icon: <ArrowBackIcon />, route: '/landing' },
  ];

  return (
    <List>
      {menuItems.map((item) => {
        if (item.adminOnly && userRole !== 'admin') {
          return null;
        }
        return (
          <ListItem button key={item.text} onClick={() => navigate(item.route)}>
            <ListItemIcon>
              {item.showBadge ? (
                <Badge badgeContent={draftsCount} color="primary">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Menu;
