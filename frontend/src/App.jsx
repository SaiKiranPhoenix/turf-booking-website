// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';

import AdminDashboard from './features/dashboard/AdminDashboard';
import UserDashboard from './features/dashboard/UserDashboard';

// ProtectedRoute for authenticated access
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// RoleBasedRoute for role-based access
const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// Layout component with theme toggle
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Role-based Protected Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <RoleBasedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </RoleBasedRoute>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/user" 
                element={
                  <ProtectedRoute>
                    <RoleBasedRoute allowedRoles={['user']}>
                      <UserDashboard />
                    </RoleBasedRoute>
                  </ProtectedRoute>
                } 
              />

              {/* Default route redirection */}
              <Route path="/" element={<Navigate to="/login" />} />
              
              {/* Unauthorized Access */}
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
