
const fs = require('fs');

const cache_request = require('./utils/cache_request');
const pseudo_cheerio = require('./utils/pseudo_cheerio');


const CRAWL_DIR = './.crawls/';


// ## Crawl sites
//

function crawl_sites() {
  if (!fs.existsSync(CRAWL_DIR)) {
    fs.mkdirSync(CRAWL_DIR);
  }

  let content = fs.readFileSync('./SITES.json', 'utf8');
  let sites = JSON.parse(content);

  (function loop() {
    let site = sites.shift();

    if (site) {

      cache_request.cache_request(site.url, (err, content) => {
        if (err) {
          console.error(err);
        } else {
          let data = pseudo_cheerio.extract(content, site);
          console.log(`${site.id} -> ${data.length} result${data.length == 1 ? '' : 's'}`);

          let json = JSON.stringify(data, null, 2);
          let result_path = `${CRAWL_DIR}${site.id}.json`;

          fs.writeFileSync(result_path, json);
          
          loop();
        }
      })
    }
  })();
}


// ## Main
//

if (require.main === module) {
    crawl_sites();
}
