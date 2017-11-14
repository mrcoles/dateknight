import React from 'react';
import { BaseComponent, DEFAULT_LANG_ID } from './utils.js';

// import './ReferenceView.css';

import LangSelector from './LangSelector.jsx';
import LangDetails from './LangDetails.jsx';
import LangGrid from './LangGrid.jsx';


class ReferenceView extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      lang_id: DEFAULT_LANG_ID
    };

    this._bind('updateLangId');
  }

  updateLangId(lang_id) {
    this.setState({lang_id: lang_id});
  }

  render() {
    let formats = this.props.formats;
    let langs = this.props.langs;
    let lang = langs.find(x => x.id === this.state.lang_id);
    
    return (
      <div className="ReferenceView widget">
        <LangSelector langs={langs}
                      lang_id={this.state.lang_id}
                      updateLangId={this.updateLangId} />
        <LangDetails lang={lang} />
        <LangGrid formats={formats} lang={lang} />
      </div>
    );
  }
}


export default ReferenceView;
