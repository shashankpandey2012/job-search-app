import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      // Error path
      return (
        <div className="errorBoundary">
          <div className="browser">
            <div className="controls">
              <i />
              <i />
              <i />
            </div>

            <div className="eye" />
            <div className="eye" />
            <div className="mouth">
              <div className="lips" />
              <div className="lips" />
              <div className="lips" />
              <div className="lips" />
              <div className="lips" />
              <div className="lips" />
              <div className="lips" />
              <div className="lips" />
            </div>
          </div>

          <h1>Unfortunately, something has gone wrong.</h1>
          <p>
            We are unable to fulfill your request. Rest assured we have been
            notified and are looking into the issue. Please refresh your browser
            or
            {' '}
            <a href="/">Go to Home Page</a>
            .
          </p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return children;

    // Normally, just render children
  }
}
