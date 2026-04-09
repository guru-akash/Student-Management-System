/**
 * ProtectedRoute - A wrapper component for authenticated routes.
 * It checks the Redux `auth` state:
 * - If the user is logged in, it renders the `MainLayout`.
 * - If the user is not logged in, it redirects them to the `/login` page.
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import MainLayout from './MainLayout';

const ProtectedRoute: React.FC = () => {
  // Retrieve the authentication status from the Redux store.
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Redirect to login if user is not authenticated.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the standard application layout.
  return (
    <MainLayout />
  );
};

export default ProtectedRoute;