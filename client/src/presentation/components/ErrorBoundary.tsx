import React from "react";

interface Internalstate {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false } as Internalstate;
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return (
        <div data-testid="error-boundary">
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}
