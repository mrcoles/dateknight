import React from 'react';
import { BaseComponent } from './utils.js';

import './compiled/TightGrid.css';

const _getKey = fmt => `${fmt.cat}-${fmt.code}`;
const _getExpKey = fmt => `expand-${_getKey(fmt)}`;

class TightGrid extends BaseComponent {
  constructor() {
    super();
    this.state = {};
  }

  // Handlers
  handleToggleExpand(evt, key, val) {
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
        <button
          className="info-link"
          onClick={e => this.handleToggleExpand(e, exp_key, !expanded)}
        >
          (<span className="mono">{expanded ? '–' : '+'}</span> info)
        </button>
      );

      let info_content =
        !fmt.info || !expanded ? null : (
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
      <button
        className="info-link"
        onClick={e => this.toggleAllExpands(e, !all_expanded)}
      >
        (<span className="mono">{all_expanded ? '–' : '+'}</span> infos)
      </button>
    );

    return (
      <div className="TightGrid">
        <table>
          <thead>
            <tr>
              <th />
              <th>Token</th>
              <th>
                {all_info_link}
                Output
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default TightGrid;
