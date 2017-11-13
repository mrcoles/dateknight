import React from 'react';
import { BaseComponent } from './utils.js';

import './LangSelector.css';


class LangSelector extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('handleChange');
  }

  handleChange(event) {
    this.props.updateLang(event.target.value);
  }

  render() {
    let presets = this.props.presets;
    let lang_id = this.props.lang_id;

    let options = presets.map(p => {
      return (
        <option value={p.id} key={p.id}>{p.name}</option>
      );
    });

    return (
      <div className="LangSelector widget">
        Choose language/library: &nbsp;
        <select value={lang_id} onChange={this.handleChange}>
          {options}
        </select>
      </div>
    );
  }
}


export default LangSelector;
