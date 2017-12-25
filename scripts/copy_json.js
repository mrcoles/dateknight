#!/usr/bin/env node

const fs = require('fs');
const utils = require('./utils');

const EXPORT_DIR = './web/src/data/';


// copy formats

const formats_content = fs.readFileSync('./formats.json');
const formats_exp_path = `${EXPORT_DIR}formats.js`;
fs.writeFileSync(formats_exp_path, `export default ${formats_content}`);
console.log(`created ${formats_exp_path}`);


// combine and copy langs

const langs = utils.get_langs().map(l => l.data);
const langs_contents = `export default ${JSON.stringify(langs, null, 2)}`;
const langs_exp_path = `${EXPORT_DIR}langs.js`;

fs.writeFileSync(langs_exp_path, langs_contents);
console.log(`created ${langs_exp_path}`);
