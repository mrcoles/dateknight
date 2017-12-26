const cheerio = require('cheerio');
const utils = require('./utils');


const URL = 'https://momentjs.com/docs/';


function get_data(content) {
  const $ = cheerio.load(content);
  
  let rows = $('h3 a[href="#/displaying/format/"]')
    .closest('article')
    .find('table').first().find('tr');

  let last_cat = null;

  let result = rows.map((i, r) => {
    let cols = $('td', r);
    if (cols.length !== 3) {
      return null;
    }
    const get_col = i => cols.eq(i).text().trim();

    let cat = get_col(0);

    if (!cat) {
      if (!last_cat) {
        return null;
      }
      cat = last_cat;
    } else if (cat !== last_cat) {
      last_cat = cat;
    }

    return {
      cat: cat,
      code: get_col(1),
      info: get_col(2),
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
