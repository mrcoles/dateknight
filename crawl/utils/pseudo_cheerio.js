
const cheerio = require('cheerio');


// ## Pseudos
//
// A mapping of pseudo-class selector names to functions to perform.
//
// The function signatures are (cheerio_query_result, optional_argument).
// If the argument matches an int it is auto-casted as an int, e.g.,
// `:eq(1)` -> maps to a fn named "eq" and gets called as `fn(query, 1)`
//
const PSEUDOS = {
  first: (q) => q.first(),
  eq: (q, i) => q.eq(i),
  closest: (q, sel) => q.closest(sel),
}


// ## Find
//
// $ - loaded cheerio object - the result of require('cheerio').load(<html>)
// query - string - a CSS selector for use with cheerio, e.g., `$(query)`,
//                  except it supports various pseudo elements, like `:first`
//                  and `:eq(1)`
// context - cheerio query result - OPTIONAL: if specified, search within the context
// extra_pseudos - plain object - OPTIONAL: additional rules to add to the `PSEUDO` object
//
// NOTE: the splitting breaks for any pseudo-class arguments that have spaces in them,
// the splitting regex would need to be updated to support this.
//
// Returns the result of performing the query with the given loaded query object
//
function find($, query, context, extra_pseudos) {
  let sp = query.split(_R_PSEUDOS_SPLIT).map(x => x.trim()).filter(x => x);

  // allow additional rules to be added in
  let pseudos = extra_pseudos ? Object.assign({}, PSEUDOS, extra_pseudos) : PSEUDOS;

  sp.forEach(selector => {
    if (selector.substring(0, 1) === ':') {
      if (context === null) {
        throw new Error(`Cannot put a pseudo ${selector} at the start of a query ${query}`);
      }

      let { name, arg } = _parse_pseudo(selector);
      let fn = PSEUDOS[name];
      if (fn === undefined) {
        throw new Error(`Unknown pseudo selector ${selector} in ${query}`);
      }

      context = fn(context, arg);
    } else {
      context = $(selector, context);
    }
  });

  return context;
}


// ## Extract
//
// Return a list of plain objects from the given HTML content
// using the given config info.
//
// content - string - raw HTML
// config - plain object - of the form:
//
//    {
//      rows: [selector - String - e.g., '#s-date table:first tbody tr'],
//      fields: {
//        [name]: [selector - String - e.g., 'td:eq(0)'],
//        ...
//    }
//
function extract(content, config) {
  const $ = cheerio.load(content);

  let rows = find($, config.rows);

  // populate data for `repeat_if_blank`
  let previous_nonblank = {};
  let blank_repeaters = {};
  if (config.repeat_if_blank) {
    config.repeat_if_blank.forEach(name => {
      blank_repeaters[name] = true;
    });
  }

  let result = rows.map((i, row) => {
    let row_data = {};

    for (let name in config.fields) {
      let selector = config.fields[name];
      let query = find($, selector, row);
      let val = query.text().trim();

      if (blank_repeaters[name]) {
        if (val === '') {
          val = previous_nonblank[name] || '';
        } else {
          previous_nonblank[name] = val;
        }
      }

      row_data[name] = val;
    }

    // skip any blanks (if specified) - this map implementation filters out nulls
    if (config.skip_if_blank && config.skip_if_blank.find(x => !row_data[x])) {
      return null;
    }

    if (config.repeat_if_blank) {
      config.repeat_if_blank
    }

    return row_data;
  }).get();

  return result;
}


// ## Helpers
//

// Regular expression to find any :foo or :foo(123) element
const _R_PSEUDOS_SPLIT = /(:[^ ]+)/g;

// Regular expression to extract pseudo name and argument from
// the match at index 1 and 3, e.g.,
// ":eq(1)".match(...) -> [':eq(1)', 'eq', '(1)', '1']
//
const _R_PSEUDO = /:([^\(]+)(\(([^\)]+)\))?/;

const _is_int = (x) => x ? /^\d+$/.test(x) : false

// Parse a pseudo selector returning the name and optional arg in an object
const _parse_pseudo = (selector) => {
  let match = selector.match(_R_PSEUDO);
  let arg = match[3];
  if (_is_int(arg)) {
    arg = parseInt(arg);
  }
  return match ? { name: match[1], arg } : null;
}


//
// ## Exports
//

module.exports.find = find;
module.exports.extract = extract;
