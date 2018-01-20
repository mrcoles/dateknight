const util = require('./util');


// Compare
// =======
//
// REM TODO - update this dir
//

function compare(crawled_dir, langs_dir, opts) {
  opts = opts || {};

  // load_json_files returns an array of objects
  // containing path, filename, basename, data

  // the data for crawls are arrays of objects containing the code
  let crawls = util.load_json_files(crawled_dir);

  // the data for langs are objects containing an id and formats fields,
  // the formats field is an array of objects containing the code
  let langs = util.load_json_files(langs_dir);

  // we want to find out:
  //
  // 1. what exists in crawls, but not in langs *compare by code within lang*
  // 2. what overlaps in langs (and what is orphaned) *compare by global code id*
  //    (and any category conflicts)
  //

  if (opts.missing || !opts.overlaps) {
    let missing = _findMissingCodes(crawls, langs);
    let missing_out = _getMissingDisplay(missing, opts.verbose);

    if (!opts.verbose) {
      console.log('MISSING...\n');
    }
    console.log(missing_out);
    console.log('\n\n');
  }

  if (opts.overlaps || !opts.missing) {
    // 2. find lang overlaps
    let overlaps = _findLangOverlaps(langs);
    let overlaps_out = _getLangOverlapsDisplay(overlaps, opts.verbose);

    if (!opts.verbose) {
      console.log('OVERLAPS...\n');
    }
    console.log(overlaps_out);
  }  
}


// ### Helpers
//


// Missing codes

function _findMissingCodes(crawls, langs) {
  // data structures to make comparing easier
  let all_ids = [];  
  let id_to_crawl = {};
  let id_to_lang = {};

  crawls.forEach(crawl => {
    let id = crawl.basename;
    id_to_crawl[id] = crawl.data;
    all_ids.push(id);
  });

  langs.forEach(lang => {
    let id = lang.basename;
    id_to_lang[id] = lang.data.formats;
    if (!id_to_crawl[id]) {
      all_ids.push(id);
    }
  });

  return all_ids.map(id => _findMissingCodesForId(id, id_to_crawl[id], id_to_lang[id]));
}


function _findMissingCodesForId(id, crawl_data, lang_data) {
  crawl_data = crawl_data || [];
  lang_data = lang_data || [];

  let crawl_codes = new Set(crawl_data.map(d => d.code));
  let lang_codes = new Set(lang_data.map(d => d.code));

  let langs = crawl_data.filter(d => !lang_codes.has(d.code));
  let crawls = lang_data.filter(d => !crawl_codes.has(d.code));

  return { id, crawls, langs };
}


function _getMissingDisplay(missing, verbose) {
  return verbose ? _getMissingDisplayJson(missing) : _getMissingDisplayText(missing);
}


function _getMissingDisplayJson(missing) {
  return missing.map(({ id, crawls, langs }) => {
    if (crawls.length || langs.length) {
      let out = `// ${id}`
      let nvs = [{name: 'crawls', vals: crawls}, {name: 'langs', vals: langs}];

      nvs.forEach(({ name, vals }) => {
        if (vals.length) {
          out += `\n\n// ${id} > missing from ${name}\n\n`;
          out += JSON.stringify(vals, null, 2);
        }
      });

      return out;
    }
    return null;
  }).filter(x => x).join('\n\n');
}


function _getMissingDisplayText(missing) {
  return missing.map(({ id, crawls, langs }) => {
    if (crawls.length || langs.length) {
      let out = `### ${id}`
      let nvs = [{name: 'crawls', vals: crawls}, {name: 'langs', vals: langs}];

      nvs.forEach(({ name, vals }) => {
        if (vals.length) {
          let rows = vals.map(v => `*   ${v.code}`).join('\n');
          out += `\n\n#### ${id} > missing in ${name}\n\n${rows}`;
        }
      });

      return out;
    }

    return null;

  }).filter(x => x).join('\n\n');
}


// Overlaps

function _findLangOverlaps(langs) {
  // fmt_id -> [{ lang_id, cat, id, code, example, info }, ... ]
  let fmt_id_to_langs = {};

  const _array = () => [];

  langs.forEach(lang => {
    lang.data.formats.forEach(d => {
      _setdefault(fmt_id_to_langs, d.id, _array).push(
        Object.assign({ lang_id: lang.basename }, d)
      );
    });
  });

  return fmt_id_to_langs;
}


function _getLangOverlapsDisplay(overlaps, verbose) {
  return verbose ? _getLangOverlapsDisplayTsv(overlaps) : _getLangOverlapsDisplayText(overlaps);
}

function _getLangOverlapsDisplayTsv(overlaps) {
  // fmt_id -> [{ lang_id, cat, id, code, example, info }, ... ]

  const cols = ['id', 'lang_id', 'cat', 'code', 'example', 'info'];
  const delim = '\t';
  const escape = (x) => x ? x.replace(/[\n\t]/g, ' ') : '';

  let rows = Object.entries(overlaps).map(([ fmt_id, fmts ]) => {
    return fmts.map(f => {
      return cols.map(c => escape(f[c])).join(delim);
    }).join('\n');
  }).join('\n');

  return `${cols.join(delim)}\n${rows}`;
}

function _getLangOverlapsDisplayText(overlaps) {
  // fmt_id -> [{ lang_id, cat, id, code, example, info }, ... ]
  return Object.entries(overlaps).map(([ fmt_id, fmts ]) => {
    let cats_set = new Set(fmts.map(f => f.cat));
    let cats = Array.from(cats_set);

    let langs = fmts.map(f => f.lang_id)

    return `${fmt_id}\tcats  (${cats.length}):\t${cats.join(', ')}\n\tlangs (${langs.length}):\t${langs.join(', ')}\n`;
  }).join('\n');
}


// Misc

function _setdefault(obj, key, default_func) {
  if (obj[key] === undefined) {
    obj[key] = default_func();
  }
  return obj[key];
}


// ### Main runner
//

function main() {
  let args = require('optimist').argv;
  let help = ('Usage: node compare.js [OPTIONS] <crawled_dir> <langs_dir>\n\n' +
              'OPTIONS:\n\n' +
              ' --missing  - only show the missing fields\n' +
              ' --overlaps - only show the overlaps\n' +
              ' --verbose  - print json-friendly verbose output\n' +
              '\nEx: node scripts/compare.js crawl/.crawls/ langs/');

  if (args.h || args.help || args._.length !== 2) {
    console.log(help);
    process.exit(1);
  } else if (args._.filter(_dir_exists).length > 0) {
    console.log('One or more of the specified directories do not exist.\n');
    console.log(help);
    process.exit(1);
  }

  let crawled_dir = args._[0];
  let langs_dir = args._[1];

  let opts = {
    verbose: args.verbose || args.v,
    missing: args.missing,
    overlaps: args.overlaps,
  }

  compare(crawled_dir, langs_dir, opts);
}


function _dir_exists(path) {
  var stat = null;
  try {
    stat = fs.lstatSync(path);
  } catch(e) {}

  return stat !== null && stat.isDirectory();
}


if (require.main === module) {
  main();
}
