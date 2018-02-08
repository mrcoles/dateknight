import React from 'react';

import './compiled/Footer.css';

const footer = props => {
  let this_year = new Date().getFullYear();
  return (
    <footer>
      <p className="text-center">
        View slides: <a href="DateKnight.pdf">pdf</a>
        <br />
        Made with ♥ in NYC <br />
        <a href="https://mrcoles.com">mrcoles.com</a> /{' '}
        <a href="https://twitter.com/lethys">@lethys</a> /{' '}
        <a href="https://paypal.me/mrcoles">donate</a>
        <br />
        &copy; {this_year}
      </p>
    </footer>
  );
};

export default footer;
