import React from 'react';
import { BaseComponent } from './utils.js';

import './App.css';

import LangSelector from './LangSelector.jsx';
import LangDetails from './LangDetails.jsx';
import LangGrid from './LangGrid.jsx';

import FORMATS from './data/formats.js';
import _presets from './data/presets.js';


const PRESETS = _presets.filter(x => x.formats !== undefined);
const DEFAULT_LANG_ID = 'python';


class App extends BaseComponent {
  constructor() {
    super();

    this.state = {
      formats: FORMATS,
      presets: PRESETS,
      lang_id: DEFAULT_LANG_ID
    };

    this._bind('updateLang');
  }

  updateLang(lang_id) {
    this.setState({lang_id: lang_id});
  }

  render() {
    let formats = this.state.formats;
    let presets = this.state.presets;
    console.log('formats?', formats); //REM
    console.log('presets?', presets); //REM
    console.log('lang_id?', this.state.lang_id); //REM

    let lang = presets.filter(x => x.id === this.state.lang_id)[0];

    return (
      <div className="App">
        <h1>Date Knight: <small>a universal date time string formatting reference</small></h1>
        <LangSelector presets={presets}
                      lang_id={this.state.lang_id}
                      updateLang={this.updateLang} />
        <LangDetails lang={lang} />
        <LangGrid formats={formats} lang={lang} />
      </div>
    );
  }
}


export default App;
