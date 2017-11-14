import React from 'react';
import { BaseComponent } from './utils.js';

import './LangGrid.css';


class LangGrid extends BaseComponent {
  render() {
    let lang = this.props.lang;

    let last_cat = null;
    let rows = [];
    let group_counter = 0;

    lang.formats.forEach(fmt => {
      if (fmt.cat !== last_cat) {
        last_cat = fmt.cat;
        group_counter = 0;
        rows.push(
          <div className="row row-header" key={fmt.cat + '-' + fmt.code + '-header'}>
            {fmt.cat}
          </div>
        );
      }

      let row_classes = ['row'];
      row_classes.push(group_counter % 2 === 0 ? 'odd' : 'even');
      
      rows.push(
        <div className={row_classes.join(' ')} key={fmt.cat + '-' + fmt.code}>
          <div className="item item-code">{fmt.code}</div>
          <div className="item item-info">{fmt.info}</div>
          <div className="item">{fmt.example}</div>
        </div>
      );

      group_counter++;
    });

    return (
      <div className="LangGrid">
        {rows}
      </div>
    );
  }
}


export default LangGrid;
