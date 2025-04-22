import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [errorState, setErrorState] = useState({
    hasError: false,
    error: null,
    errorInfo: null
  });

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setErrorState({
        hasError: true,
        error: error,
        errorInfo: errorInfo
      });
      // You can also log the error to an error reporting service here
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    };

    // Add error event listener
    window.addEventListener('error', (event) => {
      handleError(event.error, event.errorInfo);
    });

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (errorState.hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-richblack-5">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">We're sorry, but there was an error loading this page.</p>
          <button
            className="bg-yellow-5 text-richblack-900 px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary; 