import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-5"></div>
    </div>
  );
};

export default LoadingSpinner; 