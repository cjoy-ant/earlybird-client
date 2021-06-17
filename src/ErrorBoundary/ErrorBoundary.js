import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="ErrorBoundary">
          <h1>Something went wrong</h1>
          <p>Refresh Page</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
