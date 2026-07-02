import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner-wrapper">
        <FiLoader className="spinner-icon" />
      </div>
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;
