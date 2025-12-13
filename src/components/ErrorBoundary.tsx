import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1f253d 0%, #2c3e50 100%)',
          color: '#ffffff',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'Raleway, sans-serif'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ fontSize: '1rem', marginBottom: '30px', maxWidth: '500px' }}>
            We encountered an unexpected error. Don't worry, your progress has been saved.
          </p>
          {this.state.error && (
            <pre style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '15px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              maxWidth: '600px',
              overflow: 'auto',
              marginBottom: '30px'
            }}>
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            style={{
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
