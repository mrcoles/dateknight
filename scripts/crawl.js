const fs = require('fs');
const path = require('path');
const request = require('request');

const cached_request = require('cached-request')(request);
const pcheerio = require('pseudo-cheerio');

const _dir = filepath => path.join(__dirname, filepath);
const _pardir = filepath => path.join(__dirname, '..', filepath);

// ## File paths
const CACHE_DIR = _pardir('./.cache/');
const CRAWL_DIR = _pardir('./crawls/');
const CONFIG_DIR = _pardir('./CRAWL.json');

const CACHE_TTL = 1000 * 60 * 60 * 24 * 7; // 1 week
cached_request.setCacheDirectory(CACHE_DIR);
cached_request.setValue('ttl', CACHE_TTL);

// ## Crawl sites
//

function crawl_sites() {
  if (!fs.existsSync(CRAWL_DIR)) {
    fs.mkdirSync(CRAWL_DIR);
  }

  let content = fs.readFileSync(CONFIG_DIR, 'utf8');
  let sites = JSON.parse(content);

  (function loop() {
    let site = sites.shift();

    if (site) {
      cached_request({ url: site.url }, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          let content = res.body;
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

if (require.main === module) {
  crawl_sites();
}
