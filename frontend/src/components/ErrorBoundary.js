import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error details for debugging purposes
    console.error('Error caught by Error Boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // Display a fallback UI
      return <h1>Something went wrong.</h1>;
    }

    // Render children components if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
