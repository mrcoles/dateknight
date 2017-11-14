// Analyze
// -------
//
// Run this to compare values that are unique or missing
// from various langs in langs.json (and formats.json).
//


var formats = require('./formats.json');
var langs = require('./langs.json');


const _concat = (x, y) => x.concat(y);
const _flatMap = (f, xs) => xs.map(f).reduce(_concat, []);


function compareCoverage() {
  /*
    Get missing and unique values per language (including formats.json)
   */

  let groups = {};

  let token_counts = {};
  const _countKeys = (arr, obj) => arr.forEach(k => obj[k] = (obj[k] || 0) + 1);

  // read formats
  let format_vals = _flatMap(fmt => (
    fmt.codes.map(c => `${fmt.cat}: ${c.code}`)
  ), formats);
  groups.FORMATS = format_vals
  _countKeys(format_vals, token_counts);

  // read langs
  langs.filter(lang => lang.formats !== undefined).forEach(lang => {
    let lang_vals = lang.formats.map(fmt => (
      `${fmt.cat}: ` + (fmt.id === '?' ? `${lang.id}(${fmt.code})`  : fmt.id)
    ));

    groups[lang.id] = lang_vals;
    _countKeys(lang_vals, token_counts);
  });

  // gather uniques and missing per language
  let all_tokens = Object.keys(token_counts);
  all_tokens.sort();

  let lang_states = Object.keys(groups).map(lang_id => {
    let vals = groups[lang_id];

    let missing = [];
    let uniques = [];

    all_tokens.forEach(token => {
      let count = token_counts[token];
      let exists = vals.find(val => val === token);

      if (count !== 1 && !exists) {
        missing.push(token);
      } else if (count === 1 && exists) {
        uniques.push(token);
      }
    });

    return {
      lang: lang_id,
      missing: missing,
      uniques: uniques
    }
  });

  // print out results
  const _print_arr = (name, arr) => {
    if (arr.length) {
      console.log(`  # ${name} (${arr.length})

${arr.map(x => '    ' + x).join('\n')}\n`);
    }
  }

  lang_states.forEach(ls => {
    console.log(`# ${ls.lang}\n`);
    _print_arr('missing', ls.missing);
    _print_arr('uniques', ls.uniques);
  });
}


//
// Main
//

if (require.main === module) {
  compareCoverage();
}

