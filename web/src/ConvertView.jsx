import React from 'react';
import * as utils from './utils.js';

import './compiled/ConvertView.css';
import swap_svg from './svg/swap.svg';


class ConvertView extends utils.BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      code: '%Y-%m-%d %H:%M:%S',
      from_lang_id: props.langs[0].id,
      to_lang_id: props.langs[1].id
    };

    this._bind('handleChange', 'handleSwap');
  }

  //
  // Handlers
  //

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSwap(event) {
    event.preventDefault();

    let {converted_value} = this.getFromToAndConverted(
      this.state.code,
      this.props.langs,
      this.state.from_lang_id,
      this.state.to_lang_id
    );

    this.setState({
      code: converted_value,
      from_lang_id: this.state.to_lang_id,
      to_lang_id: this.state.from_lang_id
    });
  }

  //
  // Helpers
  //

  getFromToAndConverted(code, langs, from_lang_id, to_lang_id) {
    let from_lang = langs.find(l => l.id === from_lang_id);
    let to_lang = langs.find(l => l.id === to_lang_id);
    let converted_value = utils.convertCode(code, from_lang, to_lang);
    return {from_lang, to_lang, converted_value};
  }

  //
  // Render
  //

  render() {
    // let lang_id = this.state.lang_id;
    let langs = this.props.langs;

    let code = this.state.code;
    let {from_lang, to_lang, converted_value} = this.getFromToAndConverted(
      code, langs, this.state.from_lang_id, this.state.to_lang_id
    );

    window.FROM_LANG = from_lang;
    window.TO_LANG = to_lang;
    window.CODE = code;

    return (
      <div className="ConvertView widget">
        <h2>Convert between languages</h2>
        <div className="items">
          <div className="item">
            <label className="first">Convert</label>
            <input type="text"
                   name="code"
                   value={code}
                   onChange={this.handleChange} />
          </div>
          <div className="item">
            <label>from</label>
            <select name="from_lang_id"
                    value={from_lang.id}
                    onChange={this.handleChange}>
              {langs.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div className="item">
            <label>to</label>
            <select name="to_lang_id"
                    value={to_lang.id}
                    onChange={this.handleChange}>
              {langs.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div className="item">
            <a href="#swap" onClick={this.handleSwap}>
              <img className="svg-icon svg-swap" src={swap_svg} alt="swap" />
            </a>
          </div>
          <div className="item item-result">
            <label className="first">Result</label>
            <input className="result-text"
                   type="text"
                   readOnly={true}
                   value={converted_value} />
          </div>
        </div>
      </div>
    );
  }
}


export default ConvertView;
