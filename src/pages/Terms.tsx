import React from 'react';
import { Helmet } from 'react-helmet';

const Terms: React.FC = () => {
  return (
    <div className="page-content">
      <Helmet><title>Terms of Service | ThumbGrabber</title></Helmet>
      <h1>Terms of Service</h1>
      <p>By accessing this website we assume you accept these terms and conditions.</p>
      <h3>User Responsibilities</h3>
      <p>You agree to use this tool only for lawful purposes.</p>
    </div>
  );
};

export default Terms;
