import React, { Component } from 'react';

import './compiled/App.css';
import ForkMe from './ForkMe';
import ReferenceView from './ReferenceView';
import ConvertView from './ConvertView';
import Footer from './Footer';

import _langs from './data/langs';

const LANGS = _langs.filter(x => x.formats !== undefined);

class App extends Component {
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
        <ForkMe url="https://github.com/mrcoles/dateknight" title="View source on Github" />
        <div className="container main">
          <h1>
            <a href="https://mrcoles.com/dateknight/">Date Knight</a>
            <small>
              A universal date time string <span className="nowrap">formatting reference</span>
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
