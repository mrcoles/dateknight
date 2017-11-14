import React from 'react';
import * as utils from './utils.js';

import './compiled/ConvertView.css';
import swap_svg from './svg/swap.svg';


class ConvertView extends utils.BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      code: '%Y-%m-%d %H:%M:%S',
      from_lang_id: props.langs[0].id
    };

    this._bind('handleChange', 'handleSwap');
  }

  //
  // Handlers
  //

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    let new_state = {[name]: value};

    // if change lang, let's swap out the code too
    if (name === 'from_lang_id') {
      let from_lang = this.props.langs.find(l => l.id === this.state.from_lang_id);
      let to_lang = this.props.langs.find(l => l.id === value);
      let converted_values = utils.convertCode(this.state.code, from_lang, [to_lang]);
      new_state.code = converted_values[0].code;
    }

    this.setState(new_state);
  }

  handleSwap(event, lang_id, code) {
    event.preventDefault();

    this.setState({
      code: code,
      from_lang_id: lang_id
    });
  }

  //
  // Render
  //

  render() {
    let langs = this.props.langs;
    let code = this.state.code;

    let from_lang = langs.find(l => l.id === this.state.from_lang_id);
    let to_langs = langs.filter(l => l.id !== this.state.from_lang_id);
    let converted_values = utils.convertCode(code, from_lang, to_langs);

    let elts = [];

    // header form
    elts.push(
      (
        <label className="convert-label"
               key={'convert-label'}>
          <strong>Convert:</strong>
        </label>
      ),
      (
        <div className="convert-form col23"
             key={'convert-form'}>
          <input className="base-code" type="text"
                 name="code"
                 value={code}
                 onChange={this.handleChange} />
          <label>from</label>
          <select name="from_lang_id"
                  value={from_lang.id}
                  onChange={this.handleChange}>
            {langs.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>
      )
    );

    // results
    elts.push((
      <div className="first col13" key={'convert-results'}>
        <strong>Results:</strong>
      </div>
    ));

    converted_values.forEach(({lang, code}) => elts.push(
      (
        <label className="result-label"
               key={lang.id + '-label'}>
          {lang.name}
        </label>
      ),
      (
        <div className="result-text" key={lang.id + '-text'}>
          <input type="text"
                 readOnly={true}
                 value={code} />
        </div>
      ),
      (
        <div className="result-swap" key={lang.id + '-swap'}>
          <a href="#swap" onClick={(e) => this.handleSwap(e, lang.id, code)}>
            <img className="svg-icon svg-swap" src={swap_svg} alt="swap" />
          </a>
      </div>
      )
    ));

    return (
      <div className="ConvertView widget">
        <h2>Convert between languages</h2>
        <div className="items">
          {elts}
        </div>
      </div>
    );
  }
}


export default ConvertView;
