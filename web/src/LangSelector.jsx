import React from 'react';
import { BaseComponent } from './utils/component.js';
import { LangRouter, ConvertRouter } from './utils/urls.js';

import './compiled/LangSelector.css';

class LangSelector extends BaseComponent {
  render() {
    let langs = this.props.langs;
    let convert_url = ConvertRouter.format(this.props.lang_id);

    return (
      <div className="LangSelector widget">
        <a className="right" href={convert_url}>
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
