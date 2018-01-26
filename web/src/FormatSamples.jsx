import React, { Component } from 'react';
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

class FormatSamples extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Handlers
  handleTrClick = (evt, sample) => {
    evt.preventDefault();

    this.props.onSelectSample(sample);
  };

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
        <h2>{lang.name} Examples</h2>
        <p>
          The current date and time is formatted for the following examples below. Tap on one to
          populate the converter.
        </p>
        <table className="widget">
          <tbody>
            {samples.map(sample => (
              <tr
                className={`${sample.is_current ? 'current' : ''}`}
                onClick={e => this.handleTrClick(e, sample)}
                key={`${sample.code}-${sample.is_current ? '-cur' : ''}`}
              >
                <td className="code">{sample.code}</td>
                <td>{sample.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="disclaimer">
          *The codes are converted into MomentJs to render the live examples. Any unique codes that
          do not map to Moment are displayed with an unrendered message.
        </p>
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
        let moment_code =
          m_id_to_fmt === null ? code : codeForLang(sample.global, m_id_to_fmt, id_to_fmt);
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

const codeForLang = (global_code, id_to_fmt, ref_id_to_fmt) => {
  ref_id_to_fmt = ref_id_to_fmt || id_to_fmt;

  return global_code
    .map(x => {
      if (x.startsWith('$')) {
        let fmt = id_to_fmt[x.substring(1)];
        if (fmt && !fmt.unrenderable) {
          return fmt.code;
        }
        let ref_fmt = ref_id_to_fmt[x.substring(1)];
        return `[<unrendered(${ref_fmt ? ref_fmt.code : x.substring(1)})>]`;
      }
      return x;
    })
    .join('');
};

export default FormatSamples;
