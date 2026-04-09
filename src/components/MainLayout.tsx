/**
 * MainLayout - The core layout wrapper for the application.
 * It manages the persistent sidebar (MiniDrawer) and the top navigation bar (NavBar).
 * Uses React Router's <Outlet /> to render child routes.
 */
import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import MiniDrawer from './MiniDrawer';

const MainLayout: React.FC = () => {
    // Controls whether the sidebar is expanded (open) or collapsed.
    const [open, setOpen] = useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Top Navigation Bar */}
            <NavBar open={open} />
            
            {/* Collapsible Sidebar */}
            <MiniDrawer open={open} onToggle={handleDrawerToggle} />
            
            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    // Dynamically adjusts width based on sidebar state.
                    width: { sm: `calc(100% - ${open ? 240 : 64}px)` },
                    transition: 'width 0.3s ease-in-out',
                }}
            >
                {/* Spacer to prevent content from being hidden behind the fixed NavBar */}
                <Toolbar sx={{ height: 64 }} /> 
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;

