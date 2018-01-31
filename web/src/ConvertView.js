import React, { Component } from 'react';
import { convertCode } from './utils/convert';
import { scrollDelayed } from './utils/scroll';
import { ConvertRouter } from './utils/urls';
import AutoCompleter from './AutoCompleter';
import FormatSamples from './FormatSamples';

import './compiled/ConvertView.css';

class ConvertView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '%Y-%m-%d %H:%M:%S',
      from_lang_id: 'python'
    };
  }

  // Life-cycle
  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange, false);
    this._handleHashChange();
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  // Handlers
  handleHashChange = evt => {
    evt.preventDefault();
    this._handleHashChange();
  };

  _handleHashChange = () => {
    let lang_id = ConvertRouter.get(this.props.langs);
    if (lang_id) {
      this._changeLangId(lang_id);
      scrollDelayed('ConvertView');
    }
  };

  handleChangeCode = evt => {
    let code = evt.target.value;
    this.setState({ code: code });
  };

  handleUpdateCode = new_code => {
    this.setState({ code: new_code });
  };

  handleChangeSelect = evt => {
    let lang_id = evt.target.value;
    ConvertRouter.go(lang_id);
  };

  handleSwap = (evt, lang_id, code) => {
    evt.preventDefault();
    ConvertRouter.go(lang_id);
  };

  handleSelectSample = sample => {
    this.setState({ code: sample.code });
  };

  // Helpers
  _getLang(lang_id) {
    return this.props.langs.find(l => l.id === lang_id);
  }

  _getOtherLangs(lang_id) {
    return this.props.langs.filter(l => l.id !== lang_id);
  }

  _changeLangId(new_lang_id) {
    let cur_code = this.state.code;
    let cur_lang = this._getLang(this.state.from_lang_id);
    let new_lang = this._getLang(new_lang_id);

    let converted_value = convertCode(cur_code, cur_lang, [new_lang]).converted_values[0];
    let new_code = converted_value.text;

    this.setState({ code: new_code, from_lang_id: new_lang.id });
  }

  // Render
  render() {
    let langs = this.props.langs;
    let code = this.state.code;

    let from_lang = this._getLang(this.state.from_lang_id);
    let to_langs = this._getOtherLangs(this.state.from_lang_id);
    let { converted_values, global_array } = convertCode(code, from_lang, to_langs);

    let anchor_link = `#convert/${from_lang.id}`;

    let ac_rows = from_lang.formats;
    let ac_fieldnames = ['cat', 'code', 'example', 'info'];

    let elts = [];

    // header form
    elts.push(
      <div className="convert-label mo-col02" key={'convert-label'}>
        <select name="from_lang_id" value={from_lang.id} onChange={this.handleChangeSelect}>
          {langs.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>,
      <div className="convert-form mo-col02" key={'convert-form'}>
        <AutoCompleter
          className="base-code"
          value={code}
          ac_rows={ac_rows}
          ac_fieldnames={ac_fieldnames}
          onChange={this.handleChangeCode}
          onUpdateValue={this.handleUpdateCode}
        />
      </div>
    );

    // results

    converted_values.forEach(({ lang, text, html }) =>
      elts.push(
        <label
          className="result-label mo-col13"
          key={lang.id + '-label'}
          onClick={e => this.handleSwap(e, lang.id)}
        >
          {lang.name}
        </label>,
        <div className="result-text" key={lang.id + '-text'}>
          <div
            className="lang-code-html inputlike multiline force-select"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )
    );

    return (
      <div className="ConvertView widget widget2x">
        <h2>
          DateTime Converter
          <a className="anchor" href={anchor_link}>
            ¶
          </a>
        </h2>
        <p className="widget">
          Automatically convert a datetime format from language/library to another.
        </p>
        <div className="items">{elts}</div>

        <FormatSamples
          lang={from_lang}
          moment_lang={this.props.langs.find(x => x.id === 'momentjs')}
          global_array={global_array}
          onSelectSample={this.handleSelectSample}
        />
      </div>
    );
  }
}

export default ConvertView;
