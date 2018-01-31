import React, { Component } from 'react';

import './compiled/RefTable.css';

class RefTable extends Component {
  render() {
    let formats = this.props.formats;
    let lang = this.props.lang;

    let last_cat = null;
    let rows = [];
    let group_counter = 0;

    lang.formats.forEach(fmt => {
      if (fmt.cat !== last_cat) {
        last_cat = fmt.cat;
        group_counter = 0;
        rows.push(
          <tr key={fmt.cat + '-' + fmt.id + '-header'} className="tr-header">
            <td colSpan="3">{fmt.cat}</td>
          </tr>
        );
      }

      let row_class = group_counter % 2 == 0 ? 'odd' : 'even';

      rows.push(
        <tr key={fmt.cat + '-' + fmt.id} className={row_class}>
          <td className="td-code">{fmt.code}</td>
          <td className="td-info">{fmt.info}</td>
          <td>{fmt.example}</td>
        </tr>
      );

      group_counter++;
    });

    return (
      <table className="RefTable" colSpace="0">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default RefTable;
