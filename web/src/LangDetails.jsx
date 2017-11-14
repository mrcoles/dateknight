import React from 'react';
import { BaseComponent } from './utils.js';

import './compiled/LangDetails.css';
import new_window_svg from './svg/new-window.svg';


class LangDetails extends BaseComponent {
  render() {
    let lang = this.props.lang;

    return (
      <div className={'LangDetails widget ' + (lang ? '' : 'hide')}>
        <h2>{lang.name}</h2>
        <p>
          <a target="_blank" href={lang.docs}>
            {lang.docs}
            <img className="svg-icon svg-new-window" src={new_window_svg} alt="opens in new window" />
          </a>
        </p>
        <div className={'example ' + (lang.example ? '' : 'hide')}>{lang.example}</div>
      </div>
    );
  }
}


export default LangDetails;
