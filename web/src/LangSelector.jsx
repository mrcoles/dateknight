import React, { Component } from 'react';
import { scrollDelayed } from './utils/scroll.js';
import { LangRouter, ConvertRouter, getLangId } from './utils/urls.js';

import './compiled/LangSelector.css';

class LangSelector extends Component {
  // Handlers

  handleConvertClick = evt => {
    // HACK - enforce scroll if hash doesn't change! ;P
    if (window.location.hash === evt.target.getAttribute('href')) {
      scrollDelayed('ConvertView');
    }
  };

  // Render

  render() {
    let langs = this.props.langs;

    let convert_lang_id = getLangId(this.props.langs);
    let convert_url = ConvertRouter.format(convert_lang_id);

    return (
      <div className="LangSelector widget">
        <a className="right" href={convert_url} onClick={this.handleConvertClick}>
          Converter
        </a>
        <span className="label">Choose language/library:</span>
        <span className="options">
          {langs.map(l => (
            <a href={LangRouter.format(l.id)} key={l.id}>
              {l.name}
            </a>
          ))}
        </span>
      </div>
    );
  }
}

export default LangSelector;
