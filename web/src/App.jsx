import React from 'react';
import { BaseComponent } from './utils.js';

import './compiled/App.css';
import ForkMe from './ForkMe.jsx';
import ReferenceView from './ReferenceView.jsx';
import ConvertView from './ConvertView.jsx';
import Footer from './Footer.jsx';

import _langs from './data/langs.js';

const LANGS = _langs.filter(x => x.formats !== undefined);

class App extends BaseComponent {
  constructor() {
    super();

    this.state = {
      langs: LANGS
    };
  }

  render() {
    let langs = this.state.langs;

    return (
      <div className="App">
        <ForkMe
          url="https://github.com/mrcoles/dateknight"
          title="View source on Github"
        />
        <div className="container main">
          <h1>
            Date Knight
            <small>
              A universal date time string{' '}
              <span className="nowrap">formatting reference</span>
            </small>
          </h1>
          <ReferenceView langs={langs} />
          <ConvertView langs={langs} />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
