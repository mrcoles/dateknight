const fs = require('fs');


const LANGS_DIR = './langs/';


module.exports.get_langs = function get_langs() {
  const src_files = fs.readdirSync(LANGS_DIR).filter(f => /\.json$/.test(f));

  src_files.sort();

  return src_files.map(fname => {
    const path = LANGS_DIR + fname;
    const contents = fs.readFileSync(path, {encoding: 'utf8'});
    return {
      path: path,
      filename: fname,
      data: JSON.parse(contents)
    }
  });
}
