const fs = require('fs');
const path = require('path');
const request = require('cachedrequest');

const pcheerio = require('pseudo-cheerio');

const _dir = filepath => path.join(__dirname, filepath);
const _pardir = filepath => path.join(__dirname, '..', filepath);

// ## File paths
const CACHE_DIR = _pardir('./.cache/');
const CRAWL_DIR = _pardir('./crawls/');
const CONFIG_DIR = _pardir('./CRAWL.json');

request.setCacheDirectory(CACHE_DIR);

// ## Crawl sites
//

function crawl_sites(ids) {
  if (!fs.existsSync(CRAWL_DIR)) {
    fs.mkdirSync(CRAWL_DIR);
  }

  let content = fs.readFileSync(CONFIG_DIR, 'utf8');
  let sites = JSON.parse(content);

  if (ids) {
    sites = sites.filter(s => ids.indexOf(s.id) > -1);
  }

  (function loop() {
    let site = sites.shift();

    if (site) {
      request.cached(site.url, (err, res, body) => {
        if (err) {
          console.error(err);
        } else {
          let content = body;
          let data = pcheerio.extract(content, site);
          console.log(
            `${site.id} -> ${data.length} result${data.length == 1 ? '' : 's'}`
          );

          let json = JSON.stringify(data, null, 2);
          let result_path = `${CRAWL_DIR}${site.id}.json`;

          fs.writeFileSync(result_path, json);

          loop();
        }
      });
    }
  })();
}

// ## Main
//

function main() {
  const minimist = require('minimist');

  let help = `
    Usage
      $ node crawl.js [<crawl_id> ...]

    Options
      --help, -h  show help info

    Examples
      $ node scripts/crawl.js momentjs django
  `;

  let args = minimist(process.argv.slice(2), {
    alias: { h: 'help' }
  });

  crawl_sites(args._.length ? args._ : undefined);
}

if (require.main === module) {
  main();
}
