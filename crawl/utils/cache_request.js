const fs = require('fs');
const request = require('request');

const CACHE_DIR = './.cache/';

const to_filename = url => url.replace(/[\\\/:\.\?\#&]/gi, '_');


// ## Cache Request
//
// A wrapper around `request` to perform GETs that
// get cached to the file system into `${CACHE_DIR}`
// to avoid downloading it every time.
//
function cache_request(url, cb) {
  let cache_name = to_filename(url);
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
// ## Exports
//

module.exports.cache_request = cache_request;
