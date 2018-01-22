import React from 'react';

import './compiled/Footer.css';

const footer = props => {
  let this_year = new Date().getFullYear();
  return (
    <footer>
      <p className="text-center">
        Made with ♥ in NYC <br />
        &copy; {this_year}
      </p>
    </footer>
  );
};

export default footer;
