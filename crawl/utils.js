const fs = require('fs');
const request = require('request');

const CACHE_DIR = './.cache/';

const to_fname = url => url.replace(/[\\\/:\.\?\#&]/gi, '_');


function extract_codes(url, extractor) {

  cache_request(url, (err, content) => {
    if (err) {
      console.error(err);
    } else {
      let data = extractor(content);
      console.log(JSON.stringify(data, null, 2));
    }
  });
}


function cache_request(url, cb) {
  let cache_name = to_fname(url);
  let cache_path = CACHE_DIR + cache_name;

  if (fs.existsSync(cache_path)) {
    let content = fs.readFileSync(cache_path, 'utf8');
    cb(null, content);
  } else {
    request(url, (error, response, body) => {
      if (error) {
        cb(error, body);
      } else {
        if (!fs.existsSync(CACHE_DIR)) {
          fs.mkdirSync(CACHE_DIR);
        }
        fs.writeFileSync(cache_path, body);
        cb(null, body);
      }
    });
  }
}



//
// Exports
//

module.exports.cache_request = cache_request;
module.exports.extract_codes = extract_codes;
