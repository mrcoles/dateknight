import React from 'react';
import { BaseComponent } from './utils.js';

import './compiled/TightGrid.css';


const _getKey = (fmt) => `${fmt.cat}-${fmt.code}`;
const _getExpKey = (fmt) => `expand-${_getKey(fmt)}`


class TightGrid extends BaseComponent {
  constructor() {
    super();
    this.state = {};

    this._bind('toggleExpand');
  }

  // Handlers
  toggleExpand(evt, key, val) {
    evt.preventDefault();
    this.setState({ [key]: val });
  }

  toggleAllExpands(evt, val) {
    evt.preventDefault();

    let new_state = {};

    this.props.lang.formats.forEach(fmt => {
      new_state[_getExpKey(fmt)] = val;
    });

    this.setState(new_state);
  }

  // Render

  render() {
    let lang = this.props.lang;
    let all_expanded = true;

    let last_cat = null;
    let has_info = false;

    let rows = lang.formats.map(fmt => {
      let cat = '';
      if (fmt.cat !== last_cat) {
        cat = last_cat = fmt.cat;
      }

      if (fmt.info && !has_info) {
        has_info = true;
      }

      let exp_key = _getExpKey(fmt);
      let expanded = this.state[exp_key];

      if (!expanded) {
        all_expanded = false;
      }

      let info_link = !fmt.info ? null : (
        <a className="info-link" href="#"
           onClick={(e) => this.toggleExpand(e, exp_key, !expanded)}>
          (<span className="mono">{expanded ? '–' : '+'}</span> info)
        </a>
      );

      let info_content = !fmt.info || !expanded ? null : (
        <span className="info-content">{fmt.info}</span>
      );

      return (
        <tr className="row" key={_getKey(fmt)}>
          <td className="item item-cat">{cat}</td>
          <td className="item item-code">{fmt.code}</td>
          <td className="item item-example">
            {info_link}
            {fmt.example}
            {info_content}
          </td>
        </tr>
      );
    });

    let all_info_link = !has_info ? null : (
      <a className="info-link" href="#"
         onClick={(e) => this.toggleAllExpands(e, !all_expanded)}>
        (<span className="mono">{all_expanded ? '–' : '+'}</span> infos)
      </a>
    );

    return (
      <div className="TightGrid">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Token</th>
              <th>
                {all_info_link}
                Output
              </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}


export default TightGrid;
