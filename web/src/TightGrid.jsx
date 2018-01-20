import React from 'react';
import { BaseComponent } from './utils.js';

import './compiled/TightGrid.css';


class TightGrid extends BaseComponent {
  render() {
    let lang = this.props.lang;
    let last_cat = null;

    let headers = ['', 'Token', 'Output'];

    let rows = lang.formats.map(fmt => {
      let cat = '';
      if (fmt.cat !== last_cat) {
        cat = last_cat = fmt.cat;
      }

      return (
        <tr className="row" key={`${fmt.cat}-${fmt.code}`}>
          <td className="item item-cat">{cat}</td>
          <td className="item item-code">{fmt.code}</td>
          <td className="item item-example">{fmt.example}</td>
        </tr>
      );
    });

    return (
      <div className="TightGrid">
        <table>
          <thead>
            <tr>
              {headers.map(text => (
                <th>{text}</th>
              ))}
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
