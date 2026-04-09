/**
 * Global Theme Configuration.
 * Defines the visual identity of the Student Management application using Material UI's createTheme.
 * Highlights:
 * - Color Palette: A professional blue-themed UI (Soft light backgrounds vs deep blue primaries).
 * - Typography: Custom font stack (Inter/Roboto) for clean readability.
 * - Component Overrides: High-quality shadows, rounded corners (8px-16px), and premium gradients on primary/secondary buttons.
 */
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3b82f6', // Standard Blue
            light: '#60a5fa',
            dark: '#2563eb',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#1e3a8a', // Dark Blue/Navy
            light: '#1e40af',
            dark: '#172554',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f0f2f5', // Soft light gray/blue tint for overall page bg
            paper: '#ffffff',
        },
        text: {
            primary: '#1f2937',
            secondary: '#6b7280',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 }, // Disables all-caps buttons
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    },
                },
                // Custom Gradient buttons for a "Premium" look
                containedPrimary: {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)',
                    },
                },
                containedSecondary: {
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #172554 0%, #0c132c 100%)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: 'none',
                    boxShadow: '4px 0 24px 0 rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export default theme;

