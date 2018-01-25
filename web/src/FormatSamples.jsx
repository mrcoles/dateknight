import React from 'react';
import { BaseComponent } from './utils/component.js';

import './compiled/FormatSamples.css';

const SAMPLES = [
  {
    example: 'Thursday, Jan 25, 2018',
    code: 'EEEE, MMM d, y',
    global: ['$A', ', ', '$b', ' ', '$-d', ', ', '$Y']
  },
  {
    example: '01/25/2018',
    code: 'MM/dd/yyyy',
    global: ['$m', '/', '$d', '/', '$y']
  },
  {
    example: '01-25-2018 02:37',
    code: 'MM-dd-yyyy HH:mm',
    global: ['$m', '-', '$d', '-', '$y', ' ', '$H', ':', '$M']
  },
  {
    example: 'Jan 25, 2:37 AM',
    code: 'MMM d, h:mm a',
    global: ['$b', ' ', '$-d', ', ', '$-I', ':', '$M', ' ', '$p']
  },
  {
    example: 'January 2018',
    code: 'MMMM yyyy',
    global: ['$B', ' ', '$y']
  },
  {
    example: 'Jan 25, 2018',
    code: 'MMM d, yyyy',
    global: ['$b', ' ', '$-d', ', ', '$y']
  },
  {
    example: 'Thu, 25 Jan 2018 02:37:44 +0000',
    code: 'E, d MMM yyyy HH:mm:ss Z',
    global: ['$a', ', ', '$-d', ' ', '$b', ' ', '$y', ' ', '$H', ':', '$M', ':', '$S', ' ', '$z']
  },
  {
    example: '2018-01-25T02:37:44+0000',
    code: "yyyy-MM-dd'T'HH:mm:ssZ",
    global: ['$y', '-', '$m', '-', '$d', "'T'", '$H', ':', '$M', ':', '$S', '$z']
  }
];

class FormatSamples extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Handlers
  handleTrClick(evt, sample) {
    evt.preventDefault();

    this.props.onSelectSample(sample);
  }

  // Render
  render() {
    let lang = this.props.lang;

    let samples = applyLang(lang);

    return (
      <div className="FormatSamples widget widget2x">
        <br />
        <br />
        <h2>Examples</h2>
        <p>Tap a sample below to populate the converter:</p>
        <table className="widget">
          <tbody>
            {samples.map(sample => (
              <tr onClick={e => this.handleTrClick(e, sample)} key={sample.code}>
                <td>{sample.example}</td>
                <td>{sample.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Helper Functions

const applyLang = lang => {
  let id_to_fmt = {};
  lang.formats.forEach(fmt => {
    id_to_fmt[fmt.id] = fmt;
  });

  return SAMPLES.map(sample => ({
    code: codeForLang(sample.global, id_to_fmt),
    example: sample.example
  }));
};

const codeForLang = (global_code, id_to_fmt) =>
  global_code
    .map(
      x =>
        x.substring(0, 1) === '$'
          ? id_to_fmt[x.substring(1)].code || `<ErrorNotFound(${x.substring(1)})>`
          : x
    )
    .join('');

export default FormatSamples;
