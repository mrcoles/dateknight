import React from 'react';
import { BaseComponent } from './utils.js';


class LangDetails extends BaseComponent {
  render() {
    let lang = this.props.lang;

    if (!lang) {
      return (
        <div className="LangDetails hide">
        </div>
      );
    }

    return (
      <div className="LangDetails widget">
        {lang.name} - <a target="_blank" href={lang.docs}>{lang.docs}</a>
      </div>
    );
  }
}


export default LangDetails;
