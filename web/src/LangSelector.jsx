import React from 'react';
import { BaseComponent } from './utils.js';

import './compiled/LangSelector.css';


class LangSelector extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('handleClick');
  }

  handleClick(evt, lang) {
    evt.preventDefault();
    this.props.updateLangId(lang.id);
  }

  render() {
    let langs = this.props.langs;

    return (
      <div className="LangSelector widget">
        <span className="label">Choose language/library:</span>
        <span className="options">
          {langs.map(l => (
            <a href={'#' + l.id}
               key={l.id}
               onClick={(e) => this.handleClick(e, l)}>
              {l.name}
            </a>
          ))}
        </span>
      </div>
    );
  }
}


export default LangSelector;
