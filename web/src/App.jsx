import React from 'react';
import { BaseComponent } from './utils.js';

import './compiled/App.css';
import ReferenceView from './ReferenceView.jsx';
import ConvertView from './ConvertView.jsx';

import FORMATS from './data/formats.js';
import _langs from './data/langs.js';


const LANGS = _langs.filter(x => x.formats !== undefined);


class App extends BaseComponent {
  constructor() {
    super();

    this.state = {
      formats: FORMATS,
      langs: LANGS,
    };
  }

  render() {
    let formats = this.state.formats;
    let langs = this.state.langs;

    return (
      <div className="App">
        <div className="container">
          <h1>
            Date Knight
            <small>
              A universal date time string {' '}
              <span className="nowrap">formatting reference</span>
            </small>
          </h1>
          <ReferenceView langs={langs} formats={formats} />
          <ConvertView langs={langs} />
          <br /><br />
          <div>
            <strong>
              <a target="_blank" rel="noopener noreferrer"
                 href="https://github.com/mrcoles/dateknight">
                View source on Github &raquo;
              </a>
            </strong>
          </div>
          <br /><br />
        </div>
      </div>
    );
  }
}


export default App;
