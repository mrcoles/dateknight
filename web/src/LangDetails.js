import React, { Component } from 'react';

import './compiled/LangDetails.css';
import new_window_svg from './svg/new-window.svg';

class LangDetails extends Component {
  render() {
    let lang = this.props.lang;

    return (
      <div className={'LangDetails widget ' + (lang ? '' : 'hide')}>
        <div className="header">
          <h2>{lang.name}</h2>
          <a className="docs-link" target="_blank" rel="noopener noreferrer" href={lang.docs}>
            docs
            <img
              className="svg-icon svg-new-window"
              src={new_window_svg}
              alt="opens in new window"
            />
          </a>
        </div>
        <div className={'example ' + (lang.example ? '' : 'hide')}>{lang.example}</div>
      </div>
    );
  }
}

export default LangDetails;
