// ErrorBoundary.js
import React, {Component} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

class ErrorBoundary extends Component {
  state = {hasError: false};

  static getDerivedStateFromError(_error: Error) {
    // Update state so next render shows fallback UI
    return {hasError: true};
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    // Log error to Crashlytics
    crashlytics().recordError(error);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return (this.props as {children: React.ReactNode}).children;
  }
}

export default ErrorBoundary;
