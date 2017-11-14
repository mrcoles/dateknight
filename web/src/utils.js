import { Component } from 'react';


export const DEFAULT_LANG_ID = 'python';


export class BaseComponent extends Component {
  _bind(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}


export function convertCode(code, from_lang, to_langs) {
  let formats = _extractFormats(from_lang);

  return to_langs.map(to_lang => {
    let matches = _findMatches(code, formats);
    let parsed_code = _parseMatches(code, matches);
    let result = _convertMatch(parsed_code, to_lang);

    return {lang: to_lang, code: result};
  });
}


function _extractFormats(lang) {
  // Extract, copy, and sort `lang.formats`
  let formats = lang.formats.slice();
  formats.sort((a, b) => b.code.length - a.code.length);
  return formats;
}


function _findMatches(code, formats) {
  // Check each index of `code` for a matching `code` in
  // `formats`, looking for the longest ones first.
  // Returns an array of matches with {start, end, value, format_id}
  //
  let matches = [];

  let code_i = 0;

  const _findMatch = (fmt) => (
    code.substring(code_i, code_i + fmt.code.length) === fmt.code
  );

  while (code_i < code.length) {
    let m = formats.find(_findMatch);

    if (m) {
      let end = code_i + m.code.length;
      matches.push({
        start: code_i,
        end: end,
        value: m.code,
        format_id: m.id
      });
      code_i += m.code.length;
    } else {
      code_i++;
    }
  }

  return matches;
}


function _parseMatches(code, matches) {
  let result = [];

  let start = 0;

  matches.push(null);

  matches.forEach(m => {
    let end = m === null ? code.length : m.start;

    if (start < end) {
      result.push({
        start: start,
        end: end,
        value: code.substring(start, end)
      });
    }

    if (m !== null) {
      result.push({
        start: m.start,
        end: m.end,
        format_id: m.format_id,
        value: m.value
      })
      end = m.end;
    }

    start = end;
  });

  return result;
}


function _convertMatch(parsed_code, to_lang) {

  return parsed_code.reduce((result, m) => {
    if (m.format_id) {
      let to_match = to_lang.formats.find(fmt => fmt.id === m.format_id);
      // TODO - offer suggestions when no equivalent is found?
      result += to_match ? to_match.code : '<NO_EQUIVALENT_FOUND(' + m.value + ')>';
    } else {
      result += m.value;
    }
    return result;
  }, '');
}
