/**
 * AppRoutes - Defines the routing table for the entire application.
 * Highlights:
 * - Public Routes: Register and Login (accessible to everyone).
 * - Private Routes: Home, Attendance, Marksheet, and Students (require authentication).
 * - Uses `ProtectedRoute` to wrap and secure administrative pages.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Home from '../pages/Home';
import Attendance from '../pages/Attendance';
import Marksheet from '../pages/Marksheet';
import StudentList from '../pages/students/StudentList';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Initial landing page: User Registration */}
    <Route path="/" element={<Register />} /> 
    <Route path="/login" element={<Login />} />
    
    {/* All routes inside ProtectedRoute's sub-tree require a valid session */}
    <Route element={<ProtectedRoute />}>
      <Route path="/home" element={<Home />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/marksheet" element={<Marksheet />} />
      <Route path="/students" element={<StudentList />} />
    </Route>
  </Routes>
);

export default AppRoutes;