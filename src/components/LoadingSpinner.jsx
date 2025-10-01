import React from 'react';

export const LoadingSpinner = ({ size = 'lg', text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <span className={`loading loading-spinner loading-${size} text-primary`}></span>
      <p className="mt-4 text-base-content/70">{text}</p>
    </div>
  );
};