import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("Error caught by ErrorBoundary: ", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by ErrorBoundary: ", error);
  }

  render() {
    if (this.state.hasError) {
      // return <h1>Something went wrong.</h1>;
      return this.props.children;
    } else {
      return this.props.children;
    }
  }
}
