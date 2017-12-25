#!/usr/bin/env node

const fs = require('fs');


const EXPORT_DIR = './web/src/data/';
const LANGS_DIR = './langs/';
const DEFAULT_READ_OPTS = {encoding: 'utf8'}


// copy formats

const formats_content = fs.readFileSync('./formats.json');
const formats_exp_path = `${EXPORT_DIR}formats.js`;
fs.writeFileSync(formats_exp_path, `export default ${formats_content}`);
console.log(`created ${formats_exp_path}`);


// combine and copy langs

const src_files = fs.readdirSync(LANGS_DIR).filter(f => /\.json$/.test(f));

src_files.sort();

const langs = src_files.map(fname => {
  const path = LANGS_DIR + fname;
  const contents = fs.readFileSync(path, {encoding: 'utf8'});
  return JSON.parse(contents);
});

const langs_contents = `export default ${JSON.stringify(langs, null, 2)}`;

const langs_exp_path = `${EXPORT_DIR}langs.js`;
fs.writeFileSync(langs_exp_path, langs_contents);
console.log(`created ${langs_exp_path}`);
