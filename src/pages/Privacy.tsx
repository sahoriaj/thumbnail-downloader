import React from 'react';
import { Helmet } from 'react-helmet';

const Privacy: React.FC = () => {
  return (
    <div className="page-content">
      <Helmet><title>Privacy Policy | ThumbGrabber</title></Helmet>
      <h1>Privacy Policy</h1>
      <p>Last updated: January 2026</p>
      <p>At ThumbGrabber, accessible from thumbgrabber.site, one of our main priorities is the privacy of our visitors.</p>
      <h3>Log Files</h3>
      <p>ThumbGrabber follows a standard procedure of using log files.</p>
      <h3>Data Storage</h3>
      <p>We do not store any user-submitted URLs or downloaded images on our servers.</p>
    </div>
  );
};

export default Privacy;
