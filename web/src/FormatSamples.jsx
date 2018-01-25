import React from 'react';
import { BaseComponent } from './utils/component.js';
import moment from 'moment';

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
    let moment_lang = this.props.moment_lang;
    let global_array = this.props.global_array;

    let samples = applyLang(lang, moment_lang, [{ global: global_array }]);

    return (
      <div className="FormatSamples widget widget2x">
        <br />
        <br />
        <h2>Examples</h2>
        <p>
          Tap a sample below to populate the converter. Example values are calculated via MomentJS
          with the current time.
        </p>
        <table className="widget">
          <tbody>
            {samples.map(sample => (
              <tr
                className={`${sample.is_current ? 'current' : ''}`}
                onClick={e => this.handleTrClick(e, sample)}
                key={`${sample.code}-${sample.is_current ? '-cur' : ''}`}
              >
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

const applyLang = (lang, moment_lang, extra_samples) => {
  extra_samples = extra_samples || [];

  let id_to_fmt = {};
  lang.formats.forEach(fmt => (id_to_fmt[fmt.id] = fmt));

  let m_id_to_fmt = null;
  if (lang.id !== moment_lang.id) {
    m_id_to_fmt = {};
    moment_lang.formats.forEach(fmt => (m_id_to_fmt[fmt.id] = fmt));
  }

  let now = moment();

  // this reduce essentially performs a flatmap
  return [extra_samples, SAMPLES].reduce((acc, samples, i) => {
    return acc.concat(
      samples.map(sample => {
        let code = codeForLang(sample.global, id_to_fmt);
        let moment_code = m_id_to_fmt === null ? code : codeForLang(sample.global, m_id_to_fmt);
        return {
          code: code,
          example: now.format(moment_code),
          hardcoded: sample.example,
          is_current: i === 0
        };
      })
    );
  }, []);
};

const codeForLang = (global_code, id_to_fmt) =>
  global_code
    .map(
      x =>
        x.startsWith('$')
          ? id_to_fmt[x.substring(1)].code || `<ErrorNotFound(${x.substring(1)})>`
          : x
    )
    .join('');

export default FormatSamples;
