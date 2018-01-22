import React from 'react';
import { BaseComponent } from './utils.js';

import './compiled/LangSelector.css';

class LangSelector extends BaseComponent {
  render() {
    let langs = this.props.langs;

    return (
      <div className="LangSelector widget">
        <span className="label">Choose language/library:</span>
        <span className="options">
          {langs.map(l => (
            <a href={'#' + l.id} key={l.id}>
              {l.name}
            </a>
          ))}
        </span>
      </div>
    );
  }
}

export default LangSelector;
