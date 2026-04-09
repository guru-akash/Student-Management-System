/**
 * MiniDrawer - A collapsible sidebar navigation component.
 * Features:
 * - Permanent drawer that shifts between mini (collapsed) and full width.
 * - Dynamically highlights the active route.
 * - Custom styling with hover animations and blue/white theme contrast.
 */
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
  IconButton
} from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  People as PeopleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface MiniDrawerProps {
  /** boolean to control if the drawer is expanded. */
  open: boolean;
  /** Callback function to toggle the drawer state. */
  onToggle: () => void;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({ open, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Definition of navigation links used in the sidebar.
  const drawerItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Students', icon: <PeopleIcon />, path: '/students' },
    { text: 'Attendance', icon: <AssignmentIcon />, path: '/attendance' },
    { text: 'Marksheet', icon: <GradeIcon />, path: '/marksheet' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 64,
        transition: 'width 0.3s ease-in-out',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 64,
          transition: 'width 0.3s ease-in-out',
          boxSizing: 'border-box',
          background: (theme) => theme.palette.secondary.main, // Dark blue background
          color: '#fff',
          overflowX: 'hidden',
          borderRight: 'none',
        },
      }}
    >
      {/* Drawer Header with App Name and Toggle Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: open ? 'space-between' : 'center',
          alignItems: 'center',
          height: 64,
          px: 2,
          background: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        {open && (
          <Typography variant="h6" fontWeight={700} sx={{ color: '#fff' }}>
            School Hub
          </Typography>
        )}
        <IconButton
          onClick={onToggle}
          sx={{
            color: '#fff',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.1)', color: (theme) => theme.palette.secondary.main },
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Navigation List */}
      <Box sx={{ overflow: 'auto', flexGrow: 1, mt: 2 }}>
        <List>
          {drawerItems.map((item) => (
            <ListItem
              component="button"
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                padding: open ? '10px 16px' : '10px 12px',
                margin: '8px 8px',
                borderRadius: 2,
                width: open ? 'calc(100% - 16px)' : 'calc(100% - 16px)',
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: open ? 'flex-start' : 'center',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s ease',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? (theme) => theme.palette.primary.main : '#fff',
                  minWidth: open ? 40 : 0,
                  justifyContent: 'center',
                  '&:hover': { color: (theme) => theme.palette.secondary.main },
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#fff',
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MiniDrawer;