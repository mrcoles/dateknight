import React, { Component } from 'react';
import { LangRouter, getLangId } from './utils/urls';

import LangSelector from './LangSelector';
import LangDetails from './LangDetails';
import TightGrid from './TightGrid';

class ReferenceView extends Component {
  constructor(props) {
    super(props);

    let lang_id = getLangId(this.props.langs);

    this.state = {
      lang_id: lang_id
    };
  }

  // Life-cycle
  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange, false);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  // Handlers
  handleLangId = lang_id => {
    this.setState({ lang_id: lang_id });
  };

  handleHashChange = evt => {
    evt.preventDefault();
    let lang_id = LangRouter.get(this.props.langs);
    if (lang_id) {
      this.setState({ lang_id: lang_id });
    }
  };

  // Render
  render() {
    let langs = this.props.langs;
    let lang = langs.find(x => x.id === this.state.lang_id);

    return (
      <div className="ReferenceView widget widget2x">
        <LangSelector langs={langs} lang_id={this.state.lang_id} updateLangId={this.handleLangId} />
        <LangDetails lang={lang} />
        <TightGrid lang={lang} />
      </div>
    );
  }
}

export default ReferenceView;
