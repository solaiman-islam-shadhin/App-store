import React from 'react';
import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-4xl font-bold text-base-content mb-4">Page Not Found</h2>
          <p className="text-xl text-base-content/70 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-x-4">
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/apps" className="btn btn-outline">Browse Apps</Link>
        </div>
        
        <div className="mt-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-base-content/50">Maybe try searching for what you need?</p>
        </div>
      </div>
    </div>
  );
};