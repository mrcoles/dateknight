import { Component } from 'react';
import * as escapeHtml from 'escape-html';

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
    let { text, html } = _convertMatch(parsed_code, to_lang);

    return {lang: to_lang, text, html};
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
  // Returns an array of objects representing segments
  // from `code` containing:
  //
  // -   start - int - start index in code (inclusive)
  // -   end - int - end index in code (exclusive)
  // -   value - string - the slice of code from start to end
  // -   format_id - string (optional) - only returned if a match is
  //                 found, this will be a global formatting id
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
  let text = '';
  let html = '';

  parsed_code.forEach(m => {
    if (m.format_id) {
      let to_match = to_lang.formats.find(fmt => fmt.id === m.format_id);
      // TODO - offer suggestions when no equivalent is found?

      if (to_match) {
        text += to_match.code;
        html += `<strong class="lang-code">${escapeHtml(to_match.code)}</strong>`;
      } else {
        text += '<NO_EQUIV(' + m.value + ')>';
        html += `<em class="lang-unknown" title="no equivalent code found">${escapeHtml(m.value)}</em>`;
      }
    } else {
      text += m.value;
      html += escapeHtml(m.value);
    }
  });

  return {text, html};
}
