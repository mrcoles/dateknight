import React from 'react';
import { BaseComponent, DEFAULT_LANG_ID, convertCode } from './utils.js';

import './compiled/ConvertView.css';
import swap_svg from './svg/swap.svg';

class ConvertView extends BaseComponent {
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
    window.removeEventListener('handleHashChange', this.handleHashChange);
  }

  // Handlers
  handleHashChange(evt) {
    evt.preventDefault();
    this._handleHashChange();
  }

  _handleHashChange() {
    let lang_id = this._getHash();
    if (lang_id) {
      this._changeLangId(lang_id);
      window.setTimeout(() => this._scrollTo(), 200);
    }
  }

  handleChangeCode(evt) {
    let code = evt.target.value;
    this.setState({ code: code });
  }

  handleChangeSelect(evt) {
    let lang_id = evt.target.value;
    this._setHash(lang_id);
  }

  handleSwap(evt, lang_id, code) {
    evt.preventDefault();
    this._setHash(lang_id);
  }

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

    let converted_value = convertCode(cur_code, cur_lang, [new_lang])[0];
    let new_code = converted_value.text;

    this.setState({ code: new_code, from_lang_id: new_lang.id });
  }

  // URL hash is of form `#convert/${lang_id}`

  _getHash() {
    let hash = window.location.hash.substring(1);
    let sp = hash.split('/');

    if (sp.length <= 2 && sp[0] === 'convert') {
      let lang_id =
        sp[1] && this.props.langs.find(x => x.id === sp[1])
          ? sp[1]
          : DEFAULT_LANG_ID;

      return lang_id;
    }
  }

  _setHash(lang_id) {
    window.location = this._asHash(lang_id);
  }

  _asHash(lang_id) {
    return `#convert/${lang_id}`;
  }

  _scrollTo() {
    // HACK - make sure we can see ConvertView if we set it!
    let elt = document.getElementsByClassName('ConvertView')[0];
    if (elt) {
      // get global offset
      let top = 0;
      let parent = elt;
      do {
        top += parent.offsetTop;
        parent = parent.offsetParent;
      } while (parent);

      // get scrollbar location
      let scroll_top = document.documentElement.scrollTop;

      let window_height = window.innerHeight;

      if (scroll_top < top - (window_height - 100)) {
        window.scrollTo(0, top - 20);
      }
    }
  }

  // Render
  render() {
    let langs = this.props.langs;
    let code = this.state.code;

    let from_lang = this._getLang(this.state.from_lang_id);
    let to_langs = this._getOtherLangs(this.state.from_lang_id);
    let converted_values = convertCode(code, from_lang, to_langs);

    let anchor_link = `#convert/${from_lang.id}`;

    let elts = [];

    // header form
    elts.push(
      <div className="convert-label" key={'convert-label'}>
        <select
          name="from_lang_id"
          value={from_lang.id}
          onChange={this.handleChangeSelect}
        >
          {langs.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>,
      <div className="convert-form col23" key={'convert-form'}>
        <input
          className="base-code inputlike"
          type="text"
          name="code"
          value={code}
          onChange={this.handleChangeCode}
        />{' '}
        <label>into…</label>{' '}
      </div>
    );

    // results

    converted_values.forEach(({ lang, text, html }) =>
      elts.push(
        <label
          className="result-label"
          key={lang.id + '-label'}
          onClick={e => this.handleSwap(e, lang.id)}
        >
          {lang.name}
        </label>,
        <div className="result-text" key={lang.id + '-text'}>
          <div
            className="lang-code-html inputlike"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>,
        <div className="result-swap" key={lang.id + '-swap'}>
          <a href={this._asHash(lang.id)}>
            <img className="svg-icon svg-swap" src={swap_svg} alt="swap" />
          </a>
        </div>
      )
    );

    return (
      <div className="ConvertView widget widget2x">
        <h2>
          Convert
          <a className="anchor" href={anchor_link}>
            ¶
          </a>
        </h2>
        <p className="widget">
          Automatically convert a format from language to another.
        </p>
        <div className="items">{elts}</div>
      </div>
    );
  }
}

export default ConvertView;
