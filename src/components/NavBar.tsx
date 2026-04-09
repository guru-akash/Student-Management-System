/**
 * NavBar - The top navigation bar of the application.
 * Features:
 * - Fixed position that remains visible while scrolling.
 * - Modern glassmorphism design (blur + semi-transparent background).
 * - Dynamically adjusts its width based on the sidebar's (open/closed) state.
 */
import React from 'react';
import { AppBar, Toolbar, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  /** boolean to indicate if the sidebar is expanded, used for width calculations. */
  open: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ open }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        // Ensure the NavBar is always above the sidebar and content.
        zIndex: (theme) => theme.zIndex.drawer + 1,
        // Calculate width to respect the sidebar's space.
        width: open ? 'calc(100% - 240px)' : 'calc(100% - 64px)',
        transition: 'width 0.3s ease',
        background: 'rgba(255, 255, 255, 0.9)', // Modern transparency
        backdropFilter: 'blur(10px)', // Glass effect
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: 'primary.main',
            textTransform: 'none',
            fontSize: 20,
          }}
        >
          Student Management
        </Typography>
        
        <Button
          onClick={() => navigate('/login')}
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              borderRadius: 2,
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease',
            },
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 20px',
            borderRadius: 2,
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;