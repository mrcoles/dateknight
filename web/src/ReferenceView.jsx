import React from 'react';
import { BaseComponent, DEFAULT_LANG_ID } from './utils.js';

// import './ReferenceView.css';

import LangSelector from './LangSelector.jsx';
import LangDetails from './LangDetails.jsx';
import TightGrid from './TightGrid.jsx';

class ReferenceView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      lang_id: this._getLangIdFromHash()
    };
  }

  // Life-cycle
  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange, false);
  }

  componentWillUnmount() {
    window.removeEventListener('handleHashChange', this.handleHashChange);
  }

  // Handlers
  handleLangId(lang_id) {
    this.setState({ lang_id: lang_id });
  }

  handleHashChange(evt) {
    evt.preventDefault();
    this.setState({ lang_id: this._getLangIdFromHash() });
  }

  // Helpers
  _getLangIdFromHash() {
    let hash = window.location.hash.substring(1);
    return this.props.langs.find(x => x.id === hash) ? hash : DEFAULT_LANG_ID;
  }

  // Render
  render() {
    let langs = this.props.langs;
    let lang = langs.find(x => x.id === this.state.lang_id);

    return (
      <div className="ReferenceView widget">
        <LangSelector
          langs={langs}
          lang_id={this.state.lang_id}
          updateLangId={this.handleLangId}
        />
        <LangDetails lang={lang} />
        <TightGrid lang={lang} />
      </div>
    );
  }
}

export default ReferenceView;
