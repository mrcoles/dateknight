const fs = require('fs');
const path = require('path');


const LANGS_DIR = './langs/';


function get_langs() {
  return load_json_files(LANGS_DIR);
}


function load_json_files(directory) {
  const src_files = fs.readdirSync(directory).filter(f => /\.json$/.test(f));

  src_files.sort();

  return src_files.map(fname => {
    const filepath = directory + fname;
    const contents = fs.readFileSync(filepath, {encoding: 'utf8'});
    let data;

    try {
      data = JSON.parse(contents)
    } catch(e) {
      throw new Error(`Error parsing JSON for ${fname}: "${e}"`);
    }
    return {
      path: filepath,
      filename: fname,
      basename: path.basename(fname, '.json'),
      data: data
    }
  });
}


// ## Exports
//

module.exports.get_langs = get_langs;
module.exports.load_json_files = load_json_files;
