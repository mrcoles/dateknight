// Compare
// =======
//
// Run this to compare the code JSON data crawled from a webpage
// with JSON data in the `langs/` directory.
//
// For example, `./momentjs.js` crawls the MomentJS docs and
// exports a JSON array of plain objects with "code" attributes.
// Those are compared with the corresponding codes in the langs
// file, to see what is unique to the crawled data and what is
// unique to the "langs" data (if anything).
//

function compare(crawled_data, langs_data) {

  let cref = {};
  let cset = new Set(crawled_data.map(d => {
    cref[d.code] = d;
    return d.code;
  }));

  let lref = {};
  let lcodes = langs_data.formats.filter(d => {
    let code = d.code;
    if (cset.has(code)) {
      cset.delete(code);
      return false;
    }
    lref[code] = d;
    return true;
  }).map(d => d.code);

  let results = [
    {name: 'crawled', codes: cset, ref: cref},
    {name: 'entered', codes: lcodes, ref: lref},
  ];

  results.forEach(({ name, codes, ref }) => {
    console.log(`## Unique to ${name} data:\n`);
    for (let code of codes) {
      let d = ref[code];
      let extra = [];

      for (let k in d) {
        if (k !== 'code') {
          extra.push(`${k}="${trunc(d[k], 40)}"`);
        }
      }
      console.log(`* ${code} (${extra.join(', ')})`);
    }
    console.log('');
  });
}


const trunc = (txt, len) => txt && txt.length > len ? txt.substring(0, len) + ' …' : txt;


//
// Main runner
//

function main() {
  let args = require('optimist').argv,
      help = ('Usage: node compare.js <crawled_json> <langs_json>\n\n' +
              'You must prefix json paths with "./" or "../"');

  if (args.h || args.help || args._.length !== 2 ||
      args._.filter(x => !x.startsWith('.')).length > 0) {
    console.log(help);
    process.exit(0);
  }

  let crawled_data = require(args._[0]);
  let langs_data = require(args._[1]);

  compare(crawled_data, langs_data);
}


if (require.main === module) {
  main();
}
