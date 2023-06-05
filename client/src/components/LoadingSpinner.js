import React from 'react';
import '../styles/LoadingSpinner.css'; // CSS file for styling

const LoadingSpinner = (props) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;