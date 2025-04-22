import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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

    return this.props.children;
  }
}

export default ErrorBoundary; 