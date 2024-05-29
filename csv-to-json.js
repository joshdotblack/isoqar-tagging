const fs = require('fs');
const csv2json = require('./csvtojson.js');
const fileName = process.argv[2];
// const fileName = 'Account';
console.log(`Filename: ${fileName}`);
const csv = fs.readFileSync(`./SourceFiles/${fileName}.csv`, 'utf8');
console.log('READ');

const json = csv2json(csv, {parseNumbers: true, parseJSON: true});
// console.log(json, 'WRITING');
const out = JSON.stringify(json, null, 2);
fs.writeFileSync(`./TestFiles/${fileName}-parsed.json`, out, {encoding: "utf8"});
console.log('WRITTEN');
