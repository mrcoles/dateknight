const cheerio = require('cheerio');
const utils = require('./utils');


const URL = 'https://docs.djangoproject.com/en/1.11/ref/templates/builtins/';


function get_data(content) {
  const $ = cheerio.load(content);

  let rows = $('#s-date table').first().find('tbody tr');

  let result = rows.map((i, r) => {
    let cols = $('td', r);
    if (cols.length !== 3) {
      return null;
    }
    const get_col = i => cols.eq(i).text().trim();

    return {
      code: get_col(0),
      info: get_col(1),
      ex: get_col(2),
    }
  }).get();

  return result;
}


//
// Main runner
//

if (require.main === module) {
  utils.extract_codes(URL, get_data);
}
