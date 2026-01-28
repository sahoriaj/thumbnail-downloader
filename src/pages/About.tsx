import React from 'react';
import { Helmet } from 'react-helmet';

const About: React.FC = () => {
  return (
    <div className="page-content">
      <Helmet><title>About Us | ThumbGrabber</title></Helmet>
      <h1>About ThumbGrabber</h1>
      <p>ThumbGrabber is a powerful, free online tool designed to help creators, marketers, and designers download high-resolution YouTube thumbnails instantly.</p>
      <p>Our mission is to provide the simplest way to access 8K, 4K, and HD thumbnails without any complex software or registration.</p>
      <h3>Why Use ThumbGrabber?</h3>
      <ul>
        <li><strong>High Quality:</strong> We always fetch the maximum resolution available (up to 8K).</li>
        <li><strong>Privacy Focused:</strong> We do not store your search history or downloaded files.</li>
        <li><strong>Fast & Free:</strong> No limits, no hidden fees, and lightning-fast processing.</li>
      </ul>
    </div>
  );
};

export default About;
