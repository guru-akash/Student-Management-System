/**
 * Root Application Component.
 * Wraps the app with necessary providers:
 * - Redux Provider for state management.
 * - Material UI ThemeProvider for styling.
 * - Global CssBaseline for consistent browser rendering.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes/AppRoutes';
import store from './store/store';
import theme from './theme/theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;