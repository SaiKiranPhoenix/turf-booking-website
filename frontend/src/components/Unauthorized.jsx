// src/components/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Unauthorized Access</h2>
        <p className="text-gray-600 mt-2 mb-6">
          You do not have permission to view this page.
        </p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
