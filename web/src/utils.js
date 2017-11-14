import { Component } from 'react';


export const DEFAULT_LANG_ID = 'python';


export class BaseComponent extends Component {
  _bind(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}


const TERM_KEY = ''; // termination key for language trees


export function convertCode(code, from_lang, to_lang) {
  let search_tree = _makeLangTree(from_lang);
  let matches = _findMatches(code, search_tree);
  let parsed_code = _parseMatches(code, matches);
  let result = _convertMatch(parsed_code, to_lang);

  return result;
}


function _makeLangTree(lang) {
  /*
     ### Python Year and Hour

     TODO - encode escaping with this approach?

     {
       '%': {
         'Y': {
           '': 'Y'
         },
         'H': {
           '': 'H'
         },
       }
     }

     ### MomentJS month

     Needs to handle codes with the same prefix

     {
       'M': {
         'M': {
           'M': {
             'M': {
               '': 'B',
             },
             '': 'b',
           },
           '': 'm'
         },
         '': '-m'
       }
     }
   */
  let result = {};

  lang.formats.forEach(fmt => {
    let cur_leaf = result;
    for (let i = 0; i < fmt.code.length; i++) {
      let char = fmt.code.charAt(i);
      let next_leaf = cur_leaf[char];
      if (next_leaf === undefined) {
        next_leaf = {};
        cur_leaf[char] = next_leaf;
      }
      cur_leaf = next_leaf;
    }
    cur_leaf[TERM_KEY] = fmt.id;
  });

  return result;
}


function _findMatches(code, search_tree) {
  let matches = [];

  for (let char_i = 0; char_i < code.length; char_i++) {
    // short-circuit if not a match
    if (search_tree[code.charAt(char_i)] === undefined) {
      continue;
    }

    // for each index in `code`, search for a match starting there
    let longest_termination = undefined;
    let active_searches = [
      {
        start: char_i,
        end: char_i,
        value: '',
        tree: search_tree
      }
    ];

    while (active_searches.length) {
      let sch = active_searches.shift();

      let sch_char = code.charAt(sch.end);
      let subtree = sch.tree[sch_char];
      if (subtree !== undefined) {
        active_searches.push({
          start: sch.start,
          end: sch.end + 1,
          value: sch.value + sch_char,
          tree: subtree
        });
      }

      if (sch.tree[TERM_KEY] !== undefined) {
        longest_termination = sch;
        longest_termination.format_id = sch.tree[TERM_KEY];
      }
    }

    if (longest_termination !== undefined) {
      // move the index forward, so we can look after the termination
      char_i = longest_termination.end - 1;
      matches.push(longest_termination);
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
